import { isArray as _isArray, arrayNotEmpty } from 'class-validator';

/**
 * Group an array of object by a specific key of object
 * @param list list of object
 * @param key key of list's element
 * @returns group by key as object
 */
export const groupBy = (list: any[], key: string) => {
  return list.reduce((result, item) => {
    const groupKey = item[key];
    result[groupKey] = result[groupKey] || [];
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Array filter pipeline
 * @param value
 * @param index
 * @param self
 * @returns boolean
 */
export const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const isArray = (arr: any) => {
  return _isArray(arr);
};

export const isEmpty = (arr: any) => {
  return !arrayNotEmpty(arr);
};
