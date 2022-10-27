import { ExtendedTodo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

export type Props = {
  todos: ExtendedTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
