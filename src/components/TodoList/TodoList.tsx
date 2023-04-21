import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';
import { User } from '../../types/user';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          users={users}
          key={todo.id}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};
