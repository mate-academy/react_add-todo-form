import Todo from '../../types/Todo';
import User from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
  users: User[],
};

export const TodoList:React.FC<Props> = ({ todos, users }) => {
  const currentUser = (todo: Todo) => {
    const currUser = users.find(user => user.id === todo.userId);

    return currUser || null;
  };

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          user={currentUser(todo)}
        />
      ))}
    </section>
  );
};
