import moment from 'moment';
import { types } from '../types/types';

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'Cumpleaños Bernhard',
      start: moment().toDate(),
      end: moment().add(1, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Hay que comprar mucha cerveza artesanal!',
      user: { _id: '123123213', name: 'Bernhard' },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive: {
      return {
        ...state,
        activeEvent: action.payload,
      };
    }

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
