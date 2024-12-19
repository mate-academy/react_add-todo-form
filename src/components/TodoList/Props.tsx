import { Todo, User } from '../../types';

export type Props = {
  user: User;
  todos: Todo[];
  selectedTodoId?: number;
  onDelete?: (id: number) => void;
  onSelect?: (todo: Todo) => void;
};
