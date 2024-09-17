/* eslint-disable no-bitwise */
export function setInfoByte(
  isHighPriority: boolean | 0 | 1,
  isWaitAnswer: boolean | 0 | 1,
  info: number
): Buffer {
  // 0011 1111 = 63
  const arr1 = new Uint8Array([info]);

  if (isHighPriority) {
    arr1[0] |= 1 << 7;
    // 0. bitini 1 yap
  } else {
    arr1[0] &= ~(1 << 7);
  }

  if (isWaitAnswer) {
    arr1[0] |= 1 << 6;
  } else {
    arr1[0] &= ~(1 << 6);
  }

  return Buffer.from(arr1);
}

export function convertNumberTo4BytesBuffer(num: number): Buffer {
  return Buffer.from([
    (num >> 24) & 255,
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ]);
}

export function convertFloatToBuffer(value: number) {
  const buffer = Buffer.alloc(4); // 4 bayt bir float değerini temsil eder

  // Float değerini Buffer'a yazın
  buffer.writeFloatBE(value, 0);

  return buffer;
}

export function convertNumberTo2BytesBuffer(num: number): Buffer {
  return Buffer.from([(num >> 8) & 255, num & 255]);
}
