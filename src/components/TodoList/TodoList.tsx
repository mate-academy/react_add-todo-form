import Todo from '../../types/Todo';
import User from '../../types/User';

import { TodoInfo } from '../TodoInfo/TodoInfo';

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
          key={todo.id}
          users={users}
        />
      ))}
    </section>
  );
};
