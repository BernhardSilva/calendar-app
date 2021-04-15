import { types } from '../types/types';

export const addNewEvent = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const setActiveEvent = (event) => ({
  type: types.eventSetActive,
  payload: event,
});
