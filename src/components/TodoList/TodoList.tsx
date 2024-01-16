import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

interface Props {
  visibleTodos: Todo[]
  usersFromServer: User[]
}

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  usersFromServer,
}) => {
  const findUser = (id: number) => {
    return usersFromServer.find(user => user.id === id) as User;
  };

  return (
    <section className="TodoList">
      {visibleTodos.map(todo => {
        const todoUser = findUser(todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            todoUser={todoUser}
            todo={todo}
          />
        );
      })}
    </section>
  );
};
