import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
};

export type TodoInfoProps = {
  todo: Todo;
};

export type TodoListProps = {
  todos: Todo[];
};
