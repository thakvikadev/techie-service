import * as _ from 'lodash';

export * from './object.utility';
export * from './paginate.utility';
export * from './string.utility';
export * from './url.utility';

export const toBoolean = (
  val: string | number | boolean,
  defaultValue = false,
) => {
  if (!val) {
    return defaultValue;
  }
  if (typeof val === 'boolean') {
    return val;
  }
  if (typeof val === 'string') {
    return val === 'true' || val === '1';
  }
  return val === 1;
};

export const isEmpty = (value: any) => {
  return _.isEmpty(value);
};

/**
 * @description Get object name key
 * @param obj
 * @param expression
 * @returns
 */
export function nameOf<T>(
  obj: T,
  expression: (x: { [Property in keyof T]: () => string }) => () => string,
) {
  const res: { [Property in keyof T]: () => string } = {} as {
    [Property in keyof T]: () => string;
  };

  Object.keys(obj).forEach((k) => (res[k as keyof T] = () => k));

  return expression(res)();
}
