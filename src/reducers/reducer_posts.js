// import the const we define in our actions
import { DELETE_POST, FETCH_POSTS, FETCH_POST } from '../actions';
import { mapKeys, omit } from 'lodash';

// put the default state as an object
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return mapKeys(action.payload.data, 'id');
    case FETCH_POST:
    // key interpolation
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
    // key interpolation
      return omit(state, action.payload);

    default:
      return state;
  }
};
