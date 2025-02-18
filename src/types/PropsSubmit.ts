import { Todo } from './todo';

export interface PropsSubmit {
  onSubmit: (todo: Todo) => void;
}
