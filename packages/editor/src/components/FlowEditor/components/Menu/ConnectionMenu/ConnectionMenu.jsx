import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Col,
  Input,
  Label,
} from "reactstrap";
import useActiveFlow from "utils/hooks/useActiveFlow";

export default function ConnectionMenu() {
  const [connections, setConnections] = useState({
    mqtt: {
      "mqtt://localhost:5400": {
        port: 5400,
        username: "test_user",
        password: "1234",
        keepAlive: 60,
        clientId: "mqttjs-s3",
        useCleanSession: true,
        connectAutomatically: true,
      },
      "mqtt://localhost:5401": {
        port: 5401,
        username: "test_user2",
        password: "1234",
        keepAlive: 60,
        clientId: "mqttjs-s4",
        useCleanSession: true,
        connectAutomatically: true,
      },
    },
    modbus: [],
    profinet: [],
  });

  const [isOpen, setIsOpen] = useState("1");

  const toggle = (id) => {
    console.log(id);
    if (isOpen === id) {
      setIsOpen();
    } else {
      setIsOpen(id);
    }
  };
  // const { connections } = useActiveFlow();
  return (
    <div>
      <h2>MQTT</h2>
      <Accordion open={isOpen} toggle={toggle}>
        {Object.entries(connections.mqtt).map((mqttConn, index) => (
          <AccordionItem key={mqttConn[0]}>
            <AccordionHeader targetId={index}>{mqttConn[0]}</AccordionHeader>
            <AccordionBody accordionId={index}>
              {Object.entries(mqttConn[1]).map((options, i) => (
                <div key={i}>
                  <Label sm={6}>{options[0]} : </Label>
                  <Col sm={6}>
                    <Input
                      id={options[0]}
                      name={options[0]}
                      placeholder={options[1]}
                      type={typeof options[1]}
                      defaultValue={options[1]}
                    />
                  </Col>
                </div>
              ))}
            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
