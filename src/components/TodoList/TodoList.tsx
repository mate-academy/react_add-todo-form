import { TodoInfo } from '../TodoInfo';
import type { TodoWithUser } from '../../api/types';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
