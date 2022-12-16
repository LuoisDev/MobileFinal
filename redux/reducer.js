import {EMAIL_USER} from './types';
const initialState = {
  emailUser: '',
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_USER:
      return {
        ...state,
        emailUser: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
