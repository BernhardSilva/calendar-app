import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchWithToken } from '../../helpers/fetch';
import { errorMessage } from '../../helpers/error-messages';
import { prepareEvents } from '../../helpers/prepareEvents';

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const res = await fetchWithToken('events', event, 'POST');
      const body = await res.json();

      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(addNewEvent(event));
      }
    } catch (error) {
      errorMessage(error);
    }
  };
};

const addNewEvent = (event) => ({
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

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await res.json();
      if (body.ok) {
        dispatch(updatedEvent(event));
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
      // console.log(event);
    } catch (error) {
      errorMessage(error);
    }
  };
};

const updatedEvent = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const res = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await res.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      errorMessage(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken('events');
      const body = await res.json();

      const events = prepareEvents(body.events);
      // console.log(events);
      dispatch(eventLoaded(events));
    } catch (error) {
      errorMessage(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventPurge = () => ({
  type: types.eventPurge,
});
