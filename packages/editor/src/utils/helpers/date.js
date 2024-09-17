/* eslint-disable import/prefer-default-export */
export const convertDate = (date) => {
  const originalDate = new Date(date);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1;
  const year = originalDate.getFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;
  return formattedDate;
};
