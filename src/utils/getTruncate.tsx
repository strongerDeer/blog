export const getTruncate = (str: string, num: number = 100) => {
  return str?.length > num ? str.substring(0, num) + '...' : str;
};
