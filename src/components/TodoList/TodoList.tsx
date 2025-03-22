import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo data-id={todo.id} todo={todo} key={todo.id} />
    ))}
  </section>
);
