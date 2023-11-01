import todosFromServer from '../api/todos';

const todo = todosFromServer[0];

export type Todo = typeof todo;
