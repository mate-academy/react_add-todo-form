import { createStore, combineReducers } from 'redux';
import todosReducer from './todos';
import loadingReducer from './loading';

const reducer = combineReducers({
  isLoaded: loadingReducer,
  todos: todosReducer,
});

const store = createStore(reducer);

export default store;
