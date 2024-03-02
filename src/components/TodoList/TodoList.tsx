import { Todo, User } from '../../utils/types';
import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';

export function findUser(users: User[], todo: Todo) {
  return users.find(user => user.id === todo.userId) as User;
}

interface Props {
  todos: Todo[];
  // users: User[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const user = findUser(usersFromServer, todo);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
