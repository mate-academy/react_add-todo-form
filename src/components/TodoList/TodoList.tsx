import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  const findUser = (id: number) => {
    return [...users].find(user => user.id === id) || users[0];
  };

  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { userId, id } = todo;

        return (
          <TodoInfo
            todo={todo}
            user={findUser(userId)}
            key={id}
          />
        );
      })}
    </section>
  );
};
