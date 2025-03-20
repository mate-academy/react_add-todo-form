import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../App';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: Todo) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
