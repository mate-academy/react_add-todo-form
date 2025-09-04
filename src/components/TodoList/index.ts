import { User } from '../UserInfo';

export * from './TodoList';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};

export interface Props {
  todos: Todo[];
}
