import { createStore, combineReducers } from 'redux';
import todosReducer from './todoList';

const reducer = combineReducers({
  todoList: todosReducer,
});

const store = createStore(reducer);

export default store;
