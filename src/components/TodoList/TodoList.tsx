import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = users.find((usr: User) => usr.id === todo.userId);

        if (!user) {
          return null;
        }

        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            userId={todo.userId}
            completed={todo.completed}
            user={user}
          />
        );
      })}
    </section>
  );
};
