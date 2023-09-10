import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../Types';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section>
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
