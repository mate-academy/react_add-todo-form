import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../services/TodoWithUser';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.todo.id} todo={todo} />
      ))}
    </section>
  );
};
