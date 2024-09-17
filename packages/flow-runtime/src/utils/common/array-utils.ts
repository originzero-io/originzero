/* eslint-disable import/prefer-default-export */
export function arraysHaveSameElements(array1: any[], array2: any[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((element) => array2.includes(element));
}

export function objectsHaveSameProperties(obj1: object, obj2: object): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => keys2.includes(key));
}

export const fillObjectWithNull = (obj: object) => {
  const nullEntries = Object.keys(obj).map((key) => [key, null]);
  const nullObject = Object.fromEntries(nullEntries);
  return nullObject;
};
