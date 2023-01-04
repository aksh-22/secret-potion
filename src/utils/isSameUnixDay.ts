import moment from 'moment';

export const isSameUnixDay = (currentDate, previousDate) => {
  const curr = moment.unix(currentDate);
  const prev = moment.unix(previousDate);
  return curr.isSame(prev, 'd');
};

export const isSameUnixMinute = (currentDate, previousDate) => {
  const curr = moment.unix(currentDate);
  const prev = moment.unix(previousDate);
  return curr.isSame(prev, 'M');
};
