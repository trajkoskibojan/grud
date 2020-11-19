import * as actionTypes from './actionTypes';
import axios from 'axios';

export const onOpenHandler = (e) => ({
  type: actionTypes.OPEN_MODAL,
  e: e,
});

export const onCloseHandler = (event) => ({
  type: actionTypes.CLOSE_MODAL,
  event: event,
});

const dataStart = () => ({
  type: actionTypes.DATA_START,
});

const dataSuccess = (token, user, email) => ({
  type: actionTypes.DATA_SUCCESS,
  token: token,
  email: email,
  user: user
});


const dataFail = (error) => ({
  type: actionTypes.DATA_FAILD, 
  error: error, 
});

export const auth = (email, password, username) => {
  return (dispatch) => { 
    dispatch(dataStart()); 
     const authData = {
       password: password,
       identifier: email
     };

    let url = 'http://appointments.draft2017.com/auth/local';

    axios.post(url, authData)
      .then((response) => {
        localStorage.setItem('token', response.data.jwt);
        dispatch(dataSuccess(response.data.jwt, username, email));
      })
      .catch((err) => {
        dispatch(dataFail(err));
      });
  };
};
