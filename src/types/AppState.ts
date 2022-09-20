import { Todo } from './Todo';

export interface AppState {
  newTodos: Todo[];
  newTitle: string;
  userId: number | '';
  titleError: boolean;
  userError: boolean;
}
