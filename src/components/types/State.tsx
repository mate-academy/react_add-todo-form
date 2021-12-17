import { Todo } from './Todo';

export type State = {
  todoList: Todo[];
  title: string;
  userName: string;
  formErrors: { title: string; user: string; };
};
