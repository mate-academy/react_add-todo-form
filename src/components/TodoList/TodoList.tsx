import { NewTodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: NewTodo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
