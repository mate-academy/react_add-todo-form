import { Todo } from './typeTodo';
import { User } from './typeUser';

export type TodoUser = Todo & { user: User };
