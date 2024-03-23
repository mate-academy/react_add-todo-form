import { Post } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Post[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: Post) => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
