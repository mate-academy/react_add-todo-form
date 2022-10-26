import { TodoWithUser } from '../../react-app-env';

import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
