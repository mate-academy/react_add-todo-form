import { TodosMas } from '../../interfaces/TodosMas';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodosMas[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
