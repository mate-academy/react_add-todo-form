import { TodoInfo } from '../TodoInfo';

export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: UserType;
};

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todos: TodoType[];
  users: UserType[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map((todo: TodoType) => {
      const foundedUser = users?.find((user: UserType) => user.id === todo.userId);

      const newTodo = { ...todo, user: foundedUser };

      return <TodoInfo todo={newTodo} key={todo.id} />;
    })}
  </section>
);
