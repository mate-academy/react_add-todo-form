import { ToDo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: ToDo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
