import { Todo, User } from '../../types';

export type Props = {
  user: User;
  todos: Todo[] | null;
  selectedTodoId?: number;
  onDelete?: (id: number) => void;
  onSelect?: (todo: Todo) => void;
};
