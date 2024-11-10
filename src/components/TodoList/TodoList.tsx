import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  user: User;
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ user, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} user={user} todo={todo} />
      ))}
    </section>
  );
};
