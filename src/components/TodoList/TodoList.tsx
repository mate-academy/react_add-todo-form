import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      <TodoInfo todos={todos} users={users} />
    </section>
  );
};
