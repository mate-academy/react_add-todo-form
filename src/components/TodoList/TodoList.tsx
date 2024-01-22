import { TodoWUser } from '../../types/TodoWUser';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
