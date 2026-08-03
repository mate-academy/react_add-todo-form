import { TodoInfo } from '../TodoInfo';
import type { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
