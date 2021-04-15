import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      title: 'Cumpleaños Bernhard',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Hay que comprar mucha cerveza artesanal!',
      user: { _id: '', name: '' },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.eventSetActive: {
      return {
        ...state,
        activeEvent: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
