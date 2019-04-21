import moment from 'moment';
import {
  dateFormat,
  timeFormat,
} from 'utils/time';

export default function timeWorker(startTime, startDate, endTime, endDate) {
  const sessionStartTime = moment(`${moment(startDate).format(dateFormat)} ${moment(startTime).format(timeFormat)}`);
  const sessionEndTime = moment(`${moment(endDate).format(dateFormat)} ${moment(endTime).format(timeFormat)}`);
  return [sessionStartTime, sessionEndTime];
}
