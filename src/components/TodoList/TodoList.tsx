import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoWithUser } from '../../types/types';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
