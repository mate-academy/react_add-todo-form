import todosFromServer from '../api/todos';
import { User } from './User';

export type Todo = (typeof todosFromServer)[number];
export type TodoUser = Omit<Todo, 'userId'> & { user?: User; userId?: number };
