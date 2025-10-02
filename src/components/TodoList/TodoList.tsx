import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todos';
import { User } from '../../types/user';

type Props = {
  users: User[];
  todos: Todo[];
  onAddTodo: (title: string, userId: number) => void;
};

export const TodoList = ({ users, todos, onAddTodo }: Props) => {
  return (
    <>
      <TodoInfo users={users} todos={todos} onAddTodo={onAddTodo} />
    </>
  );
};
