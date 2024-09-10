import { Todo } from '../../types/interfaces';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
