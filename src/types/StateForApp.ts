import { Todo } from '../interface/Todo';

export type State = {
  todosList: Todo[] | [],
  title: string,
  selectedUser: string,
  newTodo: string,
  titleIsValid: boolean,
  userIsSelected: boolean,
  newTodoIsValid: boolean,
};
