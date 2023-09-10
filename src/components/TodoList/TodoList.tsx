import { TodoWithUser } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          data-id={todo.id}
        />
      ))}
    </section>
  );
};
