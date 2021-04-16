import { types } from '../types/types';

export const addNewEvent = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const setActiveEvent = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const clearActiveEvent = () => ({
  type: types.eventClearActive,
});

export const updatedEvent = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
});
