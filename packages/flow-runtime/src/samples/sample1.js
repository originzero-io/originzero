const edges = [
    {
        "source": "TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3d",
        "sourceHandle": "any_trig",
        "target": "COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82",
        "targetHandle": "string_value1",
        "type": "bezier",
        "group": {
            "_id": 0,
            "color": "gray"
        },
        "style": {
            "stroke": "gray",
            "strokeWidth": "2px"
        },
        "data": "",
        "id": "reactflow__edge-TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3dany_trig-COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82string_value1"
    },
    {
        "source": "TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3d",
        "sourceHandle": "any_trig",
        "target": "COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82",
        "targetHandle": "string_value2",
        "type": "bezier",
        "group": {
            "_id": 0,
            "color": "gray"
        },
        "style": {
            "stroke": "gray",
            "strokeWidth": "2px"
        },
        "data": "",
        "id": "reactflow__edge-TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3dany_trig-COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82string_value2"
    },
    {
        "source": "TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3d",
        "sourceHandle": "any_trig",
        "target": "COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82",
        "targetHandle": "int_int_value",
        "type": "bezier",
        "group": {
            "_id": 0,
            "color": "gray"
        },
        "style": {
            "stroke": "gray",
            "strokeWidth": "2px"
        },
        "data": "",
        "id": "reactflow__edge-TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3dany_trig-COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82int_int_value"
    },
]

const nodes = [
    {
        "width": 227,
        "height": 86,
        "id": "TRIGGER-7ac65-bf26-d8b-1ad4-6035f6c0c3d",
        "type": "TRIGGER",
        "position": {
            "x": -96.74329314407784,
            "y": 404.16561187892637
        },
        "data": {
            "ioEngine": {
                "targetCount": 0,
                "sourceCount": 1,
                "dynamicInput": false,
                "dynamicOutput": false
            },
            "statusHandles": {
                "inputs": {
                    "enable": false,
                    "disable": false,
                    "clear": true
                },
                "outputs": {
                    "start": true,
                    "end": false
                }
            },
            "configParameters": {
                "message": 5,
                "repeat: every x seconds": 3
            },
            "outputValues": {
                "trig": "any"
            },
            "trigHandles": {
                "trig1": false,
                "trig2": true
            },
            "triggerAttributes": "ignore",
            "frozenHandles": [],
            "preferencesClass": "class1",
            "ui": {
                "label": "TRIGGER",
                "enable": true,
                "group": {
                    "_id": 0,
                    "color": "gray"
                }
            }
        },
        "positionAbsolute": {
            "x": -96.74329314407784,
            "y": 404.16561187892637
        },
        "selected": false,
        "dragging": false
    },
    {
        "width": 273,
        "height": 191,
        "id": "COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82",
        "type": "COMBINE",
        "position": {
            "x": 362.97534440127544,
            "y": 328.71560648026156
        },
        "data": {
            "ioEngine": {
                "targetCount": 1,
                "sourceCount": 1,
                "dynamicInput": true,
                "dynamicOutput": true
            },
            "configParameters": {
                "space_character": " "
            },
            "inputParameters": {
                "value1": "string",
                "value2": "string",
                "int_value": "int",
                "any_value": "any",
                "bool_value": "boolean"
            },
            "outputValues": {
                "result": "string",
                "result2": "string",
                "result3": "string",
                "result4": "string"
            },
            "trigHandles": {
                "trig1": false,
                "trig2": true
            },
            "triggerAttributes": "ignore",
            "statusHandles": {
                "inputs": {
                    "enable": true,
                    "disable": false
                }
            },
            "frozenHandles": [],
            "preferencesClass": "class1",
            "ui": {
                "label": "COMBINE",
                "enable": true,
                "group": {
                    "_id": 0,
                    "color": "gray"
                }
            }
        },
        "selected": false,
        "positionAbsolute": {
            "x": 362.97534440127544,
            "y": 328.71560648026156
        },
        "dragging": false
    }
]


function getInputValues(){
    const edgeDatas = {};

    const myInputEdges = getInputEdges("COMBINE-32c6388-bef8-11c-6d7c-00ddf1c82");
    // console.log("myInputEdges: ",myInputEdges);
    myInputEdges.forEach((inputEdge) => {
      edgeDatas[inputEdge.sourceHandle] = {
        ...edgeDatas[inputEdge.sourceHandle],
        data: inputEdge.data
    };
    });
    console.log("edgeDatas: ",edgeDatas)
    // return nodeParameters;

    /* {
        any_value: 5,
        bool_value: true
    } */

    // const nodeParameters = {};
    // const { inputParameters } = this.self.data;
}

function getInputEdges(selfId) {
    return edges.filter((edge) => edge.target === selfId);
  }

getInputValues()