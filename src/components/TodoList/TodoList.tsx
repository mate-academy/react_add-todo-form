import { TodoInfo } from '../TodoInfo';
import { Todo, User } from '../../types/types';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: Props) => {
  return (
    <section className="TodoList">
      <TodoInfo todos={todos} users={users} />
    </section>
  );
};
