import moment from 'moment-timezone';

export const dateConvertor = (date, timezone) => {
    let cutoffString = date; // in utc
    let utcCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss');
    let displayCutoff = utcCutoff.clone().tz(timezone);

    return displayCutoff.format();
};

export const dateConvertorWithFormat = (date, timezone) => {
    let cutoffString = date; // in utc
    let utcCutoff = moment.utc(cutoffString, 'YYYYMMDD HH:mm:ss');
    let displayCutoff = utcCutoff.clone().tz(timezone);

    return displayCutoff.format('YYYY-MM-DD');
};
