import { FETCH_POSTS, NEW_POST, FETCH_TODOS, NEW_TODO, FETCH_USERS, NEW_USER,EDIT_USER } from "../actions/types";

const initialState = {
  items: [],
  item: {},
  users:[],
  user:{},
  todos:[],
  todo:{}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_USERS:
    return {
        ...state,
        users:action.payload
    };
    case NEW_USER:
        return {
            ...state,
            users:action.payload
        };
    case EDIT_USER:
        return {
            ...state,
            users:action.payload
        };
    case FETCH_TODOS:
    return {
        ...state,
        todos:action.payload
    };
    case NEW_TODO:
    return {
        ...state,
        todo:action.payload
    };
    default:
      return state;
  }
}