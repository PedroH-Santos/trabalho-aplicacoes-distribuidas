export const extractNumbers = (input: string): string => {
  return input.replace(/\D/g, '');
};
