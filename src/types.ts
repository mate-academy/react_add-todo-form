import todos from './api/todos';
import users from './api/users';

export type User = (typeof users)[number];
export type Todo = (typeof todos)[number] & { user?: User };
