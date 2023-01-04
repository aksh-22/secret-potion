import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

export const dateFormatter = (date: string | any) =>
  dayjs(date).format('Do MMM YYYY');

export const dateFormatter2 = (date: string | any) =>
  dayjs(date).format('DD MMM YYYY');

export const dateFormatForServer = (date: string | any) =>
  dayjs(date).format('YYYY-MM-DD');

export const getMonth = (date: string | any) => dayjs(date).format('MMM YYYY');
export const getMonth2 = (date: string | any) => dayjs(date).format('MMM');
