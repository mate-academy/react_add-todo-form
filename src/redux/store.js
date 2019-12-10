import { createStore } from 'redux';

import todosReducer from './todos';
import usersReducer from './users';

const reducer = (state = {}, action) => ({
  todos: todosReducer(state.todos, action),
  users: usersReducer(state.users, action),
});

const store = createStore(reducer);

export default store;
