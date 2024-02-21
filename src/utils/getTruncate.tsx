export const getTruncate = (str: string, num: number = 16) => {
  return str?.length > num ? str.substring(0, num) + '...' : str;
};
