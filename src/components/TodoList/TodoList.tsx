import { TodoInfo } from '../TodoInfo';

type ToDo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Props = {
  users: User[],
  todos: ToDo[]
};

export const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const foundUser
        = users !== undefined
          ? users.find(user => user.id === todo.userId)
          : undefined;

        return (
          <TodoInfo key={todo.id} user={foundUser} todo={todo} />
        );
      })}
    </section>
  );
};
