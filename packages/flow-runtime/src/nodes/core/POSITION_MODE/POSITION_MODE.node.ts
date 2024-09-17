import { MqttClient } from "mqtt";
import BaseNode from "../../BaseNode";
import { Node } from "../../types";
import MqttConnectionManager from "../../../flow/connections/MqttConnectionManager";
import {
  convertNumberTo2BytesBuffer,
  convertNumberTo4BytesBuffer,
  setInfoByte,
} from "../../helpers/data-helpers";

enum RequestTypes {
  COMM_INFO_BYTE_WRITE_REGISTER /* It means you want to write data to a register. */,
  COMM_INFO_BYTE_READ_REGISTER /* It means you wait to read data to a register. */,
  COMM_INFO_FIRMWARE_UPDATE_CHECK_UPDATE /* It means check firmware update. */,
  COMM_INFO_FIRMWARE_UPDATE_GET_FILE_SIZE,
  COMM_INFO_FIRMWARE_UPDATE_GET_FIRMWARE,
  COMM_INFO_STEP_MOTOR_MOVE,
  COMM_INFO_STEP_MOTOR_POSITION,
  COMM_INFO_STEP_MOTOR_RAMP_PARAMATERS,
  COMM_INFO_PID_PARAMETERS,
}

type MotorSpeedContent = {
  v_start: Buffer;
  v_stop: Buffer;
  v_max: Buffer;
  a_max: Buffer;
  d_max: Buffer;
  a1: Buffer;
  d1: Buffer;
};

export default class PositionMode extends BaseNode {
  client: MqttClient;

  packetNumber = [0xfe, 0x00, 0x21, 0x96];

  constructor(self: Node) {
    super(self);
    this.connectBroker();
  }

  connectBroker() {
    this.client = MqttConnectionManager.getInstance().getConnection(
      this.getNodeConfig("broker_url")
    );
    console.log("mqtt-broker client: ", this.client.options.host);

    this.client.on("connect", () => {
      console.log("Publisher connected");
      this.client.subscribe("lwt/comm_server");
      this.client.subscribe("server/request/37216372/bootloader");
    });

    this.client.on("message", (topic, message) => {
      // console.log("BROKER response:", topic, message, Date.now());

      let bufferIndex = 0;

      const bufferDizi = Buffer.from(message);
      const allMotors = bufferDizi.slice(5); // packetNumber ve infoByte çıkarıldı

      const firstMotor = allMotors
        .slice(bufferIndex, bufferIndex + 4)
        .readInt32BE(0); // ilk motor bilgisi alındı integer a çevrildi

      bufferIndex += 4;
      const secondMotor = allMotors
        .slice(bufferIndex, bufferIndex + 4)
        .readInt32BE(0);
      const motor = Number(this.getNodeConfig("motor"));
      if (motor === 1) {
        this.sendStatus({
          message: `
        m1: ${firstMotor}
        `,
          color: "success",
        });
      } else if (motor === 2) {
        this.sendStatus({
          message: `
        m2: ${secondMotor}
        `,
          color: "success",
        });
      }
    });

    this.client.on("error", (error) => {
      this.sendStatus({ message: error.message, color: "danger" });
      console.log("Error:", error.message);
    });
  }

  moveMotor(motorIndex: number) {
    const infoNumber = setInfoByte(
      true,
      false,
      RequestTypes.COMM_INFO_STEP_MOTOR_MOVE
    );

    const position = convertNumberTo4BytesBuffer(
      Number(this.getNodeConfig("absolutePosition"))
    );

    const content = [motorIndex, ...position];
    const data = Buffer.from([...this.packetNumber, ...infoNumber, ...content]);
    console.log("MOVE-DATA: ", data);
    return data;
  }

  rampParameter(index: number) {
    const infoNumber = setInfoByte(
      true,
      false,
      RequestTypes.COMM_INFO_STEP_MOTOR_RAMP_PARAMATERS
    );

    const dataParameter: any = this.getParameter("data");

    const speedData: MotorSpeedContent = {
      v_start: convertNumberTo4BytesBuffer(Number(dataParameter.v_start)),
      v_stop: convertNumberTo4BytesBuffer(Number(dataParameter.v_stop)),
      v_max: convertNumberTo4BytesBuffer(Number(dataParameter.v_max)),
      a_max: convertNumberTo2BytesBuffer(Number(dataParameter.a_max)),
      d_max: convertNumberTo2BytesBuffer(Number(dataParameter.d_max)),
      a1: convertNumberTo2BytesBuffer(Number(dataParameter.a1)),
      d1: convertNumberTo2BytesBuffer(Number(dataParameter.d1)),
    };

    const content = [
      index,
      ...speedData.v_start,
      ...speedData.v_stop,
      ...speedData.v_max,
      ...speedData.a_max,
      ...speedData.d_max,
      ...speedData.a1,
      ...speedData.d1,
    ];
    console.log("CONTENT: ", Buffer.from([...content]));
    const data = Buffer.from([...this.packetNumber, ...infoNumber, ...content]);
    console.log("RAMP-DATA: ", data);
    return data;
  }

  async execute() {
    const topic = this.getNodeConfig("topic");
    const motor = Number(this.getNodeConfig("motor"));

    let motorIndex = 0;

    if (motor === 1) motorIndex = 0x00;
    else if (motor === 2) motorIndex = 0x01;

    console.log(this.self.id, "motor index: ", motorIndex);

    this.client.publish(topic, this.rampParameter(motorIndex), {
      qos: 0,
    });

    setTimeout(() => {
      this.client.publish(topic, this.moveMotor(motorIndex), {
        qos: 0,
      });
    }, 500);
  }
}
