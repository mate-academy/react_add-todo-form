import { Todo } from './Todo';

export type State = {
  todoList: Todo[];
  title: string;
  userName: string;
  // userIsValid: boolean;
  // titleIsValid: boolean;
  formErrors: { title: string; user: string; };
};
