import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type NewTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
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
        const fUser = users.find(u => u.id === todo.userId);

        if (!fUser) {
          return null;
        }

        const newTodo: NewTodo = {
          ...todo,
          user: fUser,
        };

        return newTodo && <TodoInfo todo={newTodo} key={newTodo.id} />;
      })}
    </section>
  );
};
