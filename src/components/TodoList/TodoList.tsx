import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoWithUser extends Todo {
  user: User;
}

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList = ({ todos }: Props) => {
  const todosWithUsers = todos as TodoWithUser[];

  return (
    <section className="TodoList">
      {todosWithUsers.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
