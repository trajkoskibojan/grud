import * as actionTypes from '../../store/actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  email: null,
  loading: false,
  error: null, 
  show: false,
};

const onOpenHandler = (state, action) => {
  let btnText = action.e.currentTarget.innerText;
  if (btnText === 'Log out') {
    localStorage.removeItem('token');
    return updateObject(state, { token: null });
  } else {
    return updateObject(state, { show: true });
  } 
};
const onCloseHandler = (state, action) => updateObject(state, { show: false });

const onDataStart = (state, action) => updateObject(state, { loading: true });

const onDataSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    email: action.email,
    error: null,
    loading: false,
  });
};

const onDataFaild = (state, action) =>
  updateObject(state, { error: action.error, loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DATA_START:
      return onDataStart(state, action);
    case actionTypes.DATA_SUCCESS:
      return onDataSuccess(state, action);
    case actionTypes.DATA_FAILD:
      return onDataFaild(state, action);
    case actionTypes.OPEN_MODAL:
      return onOpenHandler(state, action);
    case actionTypes.CLOSE_MODAL:
      return onCloseHandler(state, action);
    default:
      return state;
  }
};

export default reducer;
