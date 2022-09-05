import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todos } from '../../types/Todos';

type Style = {
  todos: Todos[]
};

export const TodoList: React.FC<Style> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
