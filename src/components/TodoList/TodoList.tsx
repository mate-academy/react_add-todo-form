import { TodoInfo } from '../TodoInfo/TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <>
      {todos.map(t => (
        <TodoInfo key={t.id} todo={t} />
      ))}
    </>
  );
};
