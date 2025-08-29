import { Todo } from './TodoType';
import { User } from './UserType';

export type TodoWithUsers = Todo & { user: User };
