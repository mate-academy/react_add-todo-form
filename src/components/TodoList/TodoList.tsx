import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          users={users}
        />
      ))}
    </section>
  );
};
