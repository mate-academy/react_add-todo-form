import { TodoInfo } from '../TodoInfo';
import usersFromServer from '../../api/users';

type Props = {
  todos: {
    id: number
    title: string
    completed: boolean
    userId: number
  }[],
};

const findUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId);
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {
        todos.map((todo) => {
          const user = findUserById(todo.userId);

          return (user) && (
            <TodoInfo
              key={todo.id}
              user={user}
              todo={todo}
            />
          );
        })
      }
    </section>
  );
};
