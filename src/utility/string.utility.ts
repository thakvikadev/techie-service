import { isString as _isString } from 'class-validator';
/**
 * Convert to kebab case from simple string
 * eg. one-two-three
 * @param str string
 * @returns string in kebab case
 */
export const toKebab = (str: string): string => {
  return str
    .split('')
    .map((letter) => {
      if (/[A-Z]/.test(letter)) {
        return ` ${letter.toLowerCase()}`;
      }
      return letter;
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-');
};

/**
 * Convert to snake case from simple string
 * eg. one_two_three
 * @param str string
 * @returns string in snake case
 */
export const toSnakeCase = (str: string): string => {
  return toKebab(str).split('-').join('_');
};

/**
 * Convert to camel case string from simple string
 * eg. oneTwoThree
 * @param str string
 * @returns string in camel case
 */
export const toCamelCase = (str: string): string => {
  return toKebab(str)
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
};

/**
 * Convert to capitalize the first letter of the string
 * @param str any string
 * @returns string
 */
export const toFirstCamelCase = (str: string) => {
  str = str.toLowerCase();
  return str[0].toUpperCase() + str.slice(1);
};

export const isString = (str: string | any) => {
  return _isString(str);
};
