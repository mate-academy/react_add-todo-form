import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        const user = users.find(u => u.id === todo.userId);

        return user && <TodoInfo todo={todo} key={todo.id} user={user} />;
      })}
    </section>
  );
};
