import {
  TRACK_EMAIL,
  TRACK_EMAIL_FAILURE,
  TRACK_EMAIL_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  error: null
};

export const famConInterestReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACK_EMAIL:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case TRACK_EMAIL_SUCCESS:
      console.log('email added');
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case TRACK_EMAIL_FAILURE:
      console.log();
      return {
        ...state,
        error: `${action.email.emailAddress} is on our list already.`,
        isLoading: false
      };
    default:
      return state;
  }
};
