import Swal from 'sweetalert2';
import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';
import { types } from '../types/types';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken('auth', { email, password }, 'POST');
      const body = await res.json();
      const { uid, name, msg, token, ok } = body;

      if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({ uid, name }));
      } else {
        Swal.fire('Error', msg, 'error');
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithoutToken(
        'auth/register',
        { name, email, password },
        'POST',
      );
      const body = await res.json();
      const { uid, token, ok, msg } = body;
      // console.log(body);
      if (ok) {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({ uid, body: body.name }));

        Swal.fire(`Wellcome ${body.name}! 👏🐼 `, `Success!`, 'success');
      } else {
        Swal.fire('Error', msg, 'error');
      }
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const res = await fetchWithToken('auth/renew');
    const body = await res.json();
    const { uid, name, token, ok } = body;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(login({ uid, name }));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
