import moment from 'moment';
import orderBy from 'lodash/orderBy';

export function groupByDate(events) {
  let result = {};

  events.map((event) => {
    event.sessions.map((session) => {
      const startTime = moment(session.startTime);
      const date = startTime.format('YYYY-MM-DD');
      const time = startTime.format('HH:mm');

      const currentEvent = Object.assign({}, event);
      delete currentEvent.sessions;

      session.event = currentEvent;
      if (result[date]) {
        result[date].push(session);
      } else {
        result[date] = [session];
      }
    });
  });

  result = Object.keys(result).sort().map((date) => {
    return {
      date,
      sessions: _.sortBy(orderBy(result[date], ['time']), (session) => { return session.startTime; }),
    };
  });

  return result;
}
