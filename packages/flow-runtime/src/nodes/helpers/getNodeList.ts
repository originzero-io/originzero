import fs from "fs";
import path from "path";
import { NodeSkeleton } from "../types";

const defaultIcon =
  '<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.93 215.36" width="27px" height="27px"> <path d="M84.88,159.33a44.25,44.25,0,1,1,17-34.84,44,44,0,0,1-17,34.84m-27-54.09A19.25,19.25,0,1,0,77.1,124.49,19.25,19.25,0,0,0,57.85,105.24Zm134.47,97.25A24.25,24.25,0,1,0,168.1,228c13.39,0,24.9-11,24.25-24.25,0-.42,0-.83,0-1.25m-51.41-78.11a24.25,24.25,0,1,0,24.25-24.25,24.25,24.25,0,0,0-24.25,24.25M164.16,22.13a24.25,24.25,0,1,0,24.25,24.25A24.25,24.25,0,0,0,164.16,22.13ZM140.91,124.49,102,125m37.92-78.72c-8-.34-21.11,1.47-30.18,14.53A207.66,207.66,0,0,1,85,89.75m-.13,69.58a209.72,209.72,0,0,1,26,29c9.2,12.65,22.37,14.63,30.73,14.41M190.9,46.37l46.75.13m0-.25-22-23.5M215.78,70l22-23.5m-.13,79-46.75-.13m46.75-.12-22-23.5m.13,47.28,22-23.5M192.9,203.37l46.75.13m0-.25-22-23.5m.13,47.28,22-23.5" transform="translate(-8.6 -17.38)" fill="none" stroke="gray" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="9.5px"/></svg>';

function getNodeList() {
  const NodeList: NodeSkeleton = {};

  const baseFolderPath = path.join(__dirname, "../core");

  const filesAndFolders = fs.readdirSync(baseFolderPath);

  filesAndFolders.forEach((folderName) => {
    const folderPath = path.join(baseFolderPath, folderName);
    const isThisFolder = fs.statSync(folderPath).isDirectory();

    if (isThisFolder) {
      const filesInFolder = fs.readdirSync(folderPath);

      filesInFolder.forEach(async (fileName) => {
        if (fileName.endsWith(".ui.ts")) {
          const uiFilePath = path.join(folderPath, fileName);
          let { default: nodeData } = require(uiFilePath);

          try {
            nodeData.ui.icon = fs.readFileSync(
              path.resolve(folderPath, nodeData.ui.icon),
              "utf-8"
            );
          } catch (error) {
            nodeData.ui.icon = defaultIcon;
          }
          NodeList[folderName.toUpperCase()] = nodeData;
        }
      });
    } else {
      console.log(folderPath, " is not directory(folder)");
    }
  });
  return NodeList;
}

export default getNodeList;
