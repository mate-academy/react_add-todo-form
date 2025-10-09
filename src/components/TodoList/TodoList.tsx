import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUserById } from '../../utils/getUser';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  users?: User[];
}

export const TodoList = ({ todos, users }: Props) => {
  if (!todos) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => {
        const existingUser = (todo as Todo & { user?: User }).user;

        let user: User | undefined;

        if (existingUser) {
          user = existingUser;
        } else if (users) {
          user = getUserById(todo.userId, users);
        }

        if (!user) {
          return null;
        }

        const todoWithUser = { ...todo, user };

        return <TodoInfo todo={todoWithUser} key={todo.id} />;
      })}
    </section>
  );
};
