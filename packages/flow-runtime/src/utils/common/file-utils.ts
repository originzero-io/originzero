import fs from "fs";

export function writeFile(data: any) {
  fs.writeFile("src/samples/Flow.json", JSON.stringify(data), (err) => {
    if (err) console.log(err);
    console.log("file save d!");
  });
}
