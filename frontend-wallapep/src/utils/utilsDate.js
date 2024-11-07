import dayjs from 'dayjs'
export const dateFormatTemplate = 'YYYY/MM/DD hh:mm';

export let timestampToString = (timestamp) => {
    const date = dayjs.unix(timestamp / 1000);
    const formattedDate = date.format(dateFormatTemplate);
    return formattedDate;
}

export let timestampToDate = (timestamp) => {
    let dateInString = timestampToString(timestamp)
    return dayjs(dateInString, dateFormatTemplate)
}

export let timestampToDDMMYYYY = (timestamp) => {
    const date = dayjs.unix(timestamp / 1000);
    return date.format('DD/MM/YYYY');
}
