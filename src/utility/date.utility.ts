import * as moment from 'moment';

export const FORMAT_DATE_TIME = 'YYYY-MM-DD HH:mm:ss';

/**
 * format date
 * @param date
 * @param format YYYY-MM-DD
 * @returns
 */
export const toDateFormat = (
  date: Date | string,
  format = moment.HTML5_FMT.DATE,
) => {
  if (!date) {
    return null;
  }
  return moment(date).local(true).format(format);
};

export const getCurrentDateWithFormat = (
  date = new Date(),
  format = 'DD-MM-YYYY-hh:mm',
) => {
  return moment(date).format(format);
};

/**
 * format date with the current local utc
 * @param date
 * @returns date as string
 */
export const formatDateToCurrentUTC = (
  date: Date | string,
  format = 'LLLL',
) => {
  if (!date) {
    return null;
  }
  return moment(date).local(true).locale('en-au').format(format).toString();
};

/**
 * Check fromDate is before toDate then return true
 * e.g: (fromDate < toDate) //true
 * @param fromDate
 * @param toDate
 * @returns
 */
export const isBefore = (fromDate, toDate, format = moment.HTML5_FMT.DATE) => {
  fromDate = moment(fromDate).format(format);
  toDate = moment(toDate).format(format);
  return moment(fromDate).isBefore(toDate);
};

/**
 * Check fromDate is after toDate then return true
 * e.g: (fromDate > toDate) //true
 * @param fromDate
 * @param toDate
 * @returns
 */
export const isAfter = (fromDate, toDate) => {
  return moment(fromDate).isAfter(toDate);
};

/**
 * Check date is between minDate and maxDate then return true
 * @param date
 * @param minDate
 * @param maxDate
 * @param format
 * @returns
 */
export const isBetween = (
  date,
  minDate,
  maxDate,
  format = moment.HTML5_FMT.DATE,
): boolean => {
  minDate = moment(minDate).format(format);
  maxDate = moment(maxDate).format(format);
  return (
    moment(date).isSameOrAfter(minDate) && moment(date).isSameOrBefore(maxDate)
  );
};

/**
 * Get date custom field with object literal
 * e.g { days:7, months:1, years:-1 }
 * @param field
 * @param date
 * @returns
 */
export const getDate = (field?, date = new Date()) => {
  return moment(date).add(field).toDate();
};

/**
 * Get duration in human-readable
 * @param start
 * @param end
 * @returns
 */
export const toDuration = (start, end) => {
  if (!start || !end) {
    return null;
  }
  start = moment(start).format(moment.HTML5_FMT.DATE);
  end = moment(end).format(moment.HTML5_FMT.DATE);
  return moment(start).from(end);
};

/**
 * Get number of different
 * @param start
 * @param end
 * @returns
 */
export const getDifferent = (start: string | Date, end) => {
  if (!start || !end) {
    return null;
  }
  start = moment(start).format(moment.HTML5_FMT.DATE);
  end = moment(end).format(moment.HTML5_FMT.DATE);
  return moment(start).diff(end, 'day');
};
