import { Todo } from './types/todo';
import { User } from './types/user';

// This type combines a Todo with an optional User, centralizing the data structure
// used across components like TodoList and TodoInfo.
export type TodoWithUser = Todo & { user?: User };
