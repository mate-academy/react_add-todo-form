import { Todo } from '../../interfaces/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        todo.user && ( // рендеримо лише якщо user існує
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        )
      ))}
    </section>
  );
};
