import moment from 'moment';

//I pass through the events array then I parse de end and start fields to Date.
export const prepareEvents = (events = []) => {
  return events.map((e) => ({
    ...e,
    end: moment(e.end).toDate(),
    start: moment(e.start).toDate(),
  }));
};
