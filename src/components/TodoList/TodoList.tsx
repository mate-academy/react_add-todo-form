import { TodoInfo } from '../TodoInfo';
import { TodoItem } from '../../types/TodoItem';

type Props = {
  todos: TodoItem[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
