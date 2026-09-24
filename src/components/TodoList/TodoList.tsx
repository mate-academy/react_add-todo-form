import { TodoWithUserInfo } from '../../types/TodoWithUserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: TodoWithUserInfo[];
};

// Add the required props
export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
