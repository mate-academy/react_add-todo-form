import { ToDo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ToDo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          data-id={todo.id}
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
