import { TodoInfo } from '../TodoInfo';
import { TodoWithUsers } from '../../types';

interface Props {
  todos: TodoWithUsers[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
