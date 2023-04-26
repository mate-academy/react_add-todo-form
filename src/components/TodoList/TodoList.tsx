import { Todo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todoItem => (
      <TodoInfo todo={todoItem} />
    ))}
  </section>
);
