import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  users: User[],
  todos: Todo[],
};

const findUser = (id: number, users: User[]): User => {
  return users.find((user: User) => user.id === id) || users[0];
};

export const TodoList: React.FC<Props> = ({ users, todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        id={todo.id}
        title={todo.title}
        userId={findUser(todo.userId, users).id}
        completed={todo.completed}
        key={todo.id}
      />
    ))}
  </section>
);
