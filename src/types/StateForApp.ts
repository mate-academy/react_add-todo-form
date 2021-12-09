import { Todo } from '../interface/Todo';

export type State = {
  todosList: Todo[] | [],
  title: string,
  selectedUser: string,
  todo: string,
  titleIsValid: boolean,
  userIsSelected: boolean,
};
