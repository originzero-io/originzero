import { MqttClient } from "mqtt";
import BaseNode from "../../BaseNode";
import { Node } from "../../types";
import MqttConnectionManager from "../../../flow/connections/MqttConnectionManager";
import {
  convertNumberTo4BytesBuffer,
  convertFloatToBuffer,
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

export default class VelocityMode extends BaseNode {
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

    // this.client.on("message", (topic, message) => {
    //   // console.log("BROKER response:", topic, message, Date.now());

    //   let bufferIndex = 0;

    //   const bufferDizi = Buffer.from(message);
    //   const allMotors = bufferDizi.slice(5); // packetNumber ve infoByte çıkarıldı

    //   const firstMotor = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readInt32BE(0); // ilk motor bilgisi alındı integer a çevrildi

    //   bufferIndex += 4;
    //   const secondMotor = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readInt32BE(0);

    //   bufferIndex += 4;
    //   const thirdMotor = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readInt32BE(0);

    //   bufferIndex += 4;
    //   const angle = allMotors
    //     .slice(bufferIndex, bufferIndex + 8)
    //     .readDoubleBE(0);

    //   bufferIndex += 8;

    //   const pidOutput = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readFloatBE(0);

    //   bufferIndex += 4;

    //   const pidKp = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readFloatBE(0);

    //   bufferIndex += 4;

    //   const pidKi = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readFloatBE(0);

    //   bufferIndex += 4;

    //   const pidKd = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readFloatBE(0);

    //   bufferIndex += 4;

    //   const pidTargetPoint = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readFloatBE(0);

    //   bufferIndex += 4;

    //   const pidFilter = allMotors
    //     .slice(bufferIndex, bufferIndex + 4)
    //     .readInt32BE(0);

    //   bufferIndex += 4;
    //   const pidOn_off = allMotors.slice(bufferIndex, bufferIndex + 1);

    //   // console.log({
    //   //   pidOutput,
    //   //   pidKp,
    //   //   pidKi,
    //   //   pidKd,
    //   //   pidTargetPoint,
    //   //   pidFilter,
    //   //   pidOn_off,
    //   // });

    //   this.sendStatus({
    //     message: `
    //     m1: ${firstMotor}
    //     -m2: ${secondMotor}
    //     -m3: ${thirdMotor}
    //     -angle: ${angle}
    //     -pidOutput: ${pidOutput}
    //     -Kp: ${pidKp}
    //     -Ki: ${pidKi}
    //     -Kd: ${pidKd}
    //     -targetPoint: ${pidTargetPoint}
    //     -filter: ${pidFilter}
    //     -on/off: ${pidOn_off.readUInt8(0)}
    //     `,
    //     color: "success",
    //   });
    // });

    this.client.on("error", (error) => {
      this.sendStatus({ message: error.message, color: "danger" });
      console.log("Error:", error.message);
    });
  }

  sendPIDValue() {
    const infoNumber = setInfoByte(
      true,
      false,
      RequestTypes.COMM_INFO_PID_PARAMETERS
    );

    const dataParameter: any = this.getParameter("data");

    const onOff =
      dataParameter.on_off === "on" ? Buffer.from([0x01]) : Buffer.from([0x00]);

    const pidRaw = {
      kp: Number(dataParameter.Kp),
      ki: Number(dataParameter.Ki),
      kd: Number(dataParameter.Kd),
      targetPoint: Number(dataParameter.setPoint),
      filterValue: Number(dataParameter.filter),
      on_off: onOff,
    };
    const pidParameter = {
      kp: convertFloatToBuffer(Number(dataParameter.Kp)),
      ki: convertFloatToBuffer(Number(dataParameter.Ki)),
      kd: convertFloatToBuffer(Number(dataParameter.Kd)),
      targetPoint: convertFloatToBuffer(Number(dataParameter.setPoint)),
      filterValue: convertNumberTo4BytesBuffer(Number(dataParameter.filter)),
      on_off: onOff,
    };

    const content = [
      ...pidParameter.kp,
      ...pidParameter.ki,
      ...pidParameter.kd,
      ...pidParameter.targetPoint,
      ...pidParameter.filterValue,
      ...pidParameter.on_off,
    ];
    const data = Buffer.from([...this.packetNumber, ...infoNumber, ...content]);
    // console.log("PID-DATA: ", data);
    this.sendStatus({
      message: `
    setPoint: ${pidRaw.targetPoint}
    `,
      color: "success",
    });
    return data;
  }

  async execute() {
    const topic = this.getNodeConfig("topic");

    this.client.publish(topic, this.sendPIDValue(), {
      qos: 0,
    });
  }
}
