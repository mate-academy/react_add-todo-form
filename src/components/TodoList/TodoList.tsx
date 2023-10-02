import { Todo } from '../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../types/User';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { id, userId } = todo;

        const user: User = users
          .find(CurrentUser => CurrentUser.id === userId) || users[0];

        return (
          <TodoInfo
            key={id}
            todo={todo}
            user={user}
          />
        );
      })}
    </section>
  );
};
