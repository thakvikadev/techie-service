import { isDeepStrictEqual } from 'util';

/**
 * Clean null and undefined fields from object
 * if field's value is null, undefined
 * @param obj Object
 * @param opts Object
 * @returns Object
 */
export const clean = (
  obj,
  opts?: {
    /**
     * If true, only undefined has to be removed
     */
    undefinedOnly?: boolean;
    /**
     * Included empty string
     */
    includeEmpty?: boolean;
  },
) => {
  if (!obj) {
    return undefined;
  }
  for (const propName in obj) {
    // Null or Undefined value
    let isRemove = !obj[propName];
    // Only undefined value
    isRemove &&= opts?.undefinedOnly
      ? typeof obj[propName] === 'undefined' || obj[propName] === null
      : true;
    // Or value is empty
    isRemove ||= opts?.includeEmpty ? obj[propName] === '' : false;
    if (isRemove) {
      delete obj[propName];
    }
  }
  return obj;
};

/**
 * Check if object is undefined
 * @param value any
 * @returns true if undefined
 */
export const isUndefined = (value: any): boolean =>
  typeof value === 'undefined';

/**
 * Compared two objects included each field in both objects
 * @param object1 any
 * @param object2 any
 * @returns is each field in both objects are equaled
 */
export const isEqual = (object1: any, object2: any): boolean => {
  return isDeepStrictEqual(object1, object2);
};

/**
 * Get dirty fields in original object compare to modified object
 * @param object1 original
 * @param object2 modified
 * @returns object of fields in original
 */
export const getDirtyOf = (object1: any, object2: any): any => {
  const obj = { ...object1 };
  const keys1 = Object.keys(object1);

  for (const key of keys1) {
    if (object1[key] === object2[key]) {
      delete obj[key];
    }
  }

  return obj;
};

/**
 * To Normalize the object included string, number, or any other type
 * @param value string or object
 * @returns string or object
 */
export const normalize = (value: string | any) => {
  if (typeof value === 'string') {
    return value?.trim();
  }
  for (const key of value) {
    if (typeof value[key] === 'string') {
      value[key] = value[key]?.trim();
    }
  }
  return value;
};
