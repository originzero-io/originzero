/* eslint-disable import/prefer-default-export */
import fs from "fs";

const fsPromises = fs.promises;

export async function deleteFolder(folderName) {
  console.log(folderName, " klasörü siliniyor...");
  try {
    await fsPromises.rm(`./container/${folderName}`, { recursive: true });
  } catch (error) {
    console.error(`Klasör silinirken bir hata oluştu: ${error}`);
  }
}
