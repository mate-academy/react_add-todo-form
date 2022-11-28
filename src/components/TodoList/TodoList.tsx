import { TodoInfo } from '../TodoInfo';
import { TodosList } from '../../types/TodoList';

type Props = {
  todos: TodosList[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
