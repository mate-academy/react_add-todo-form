import { TodoInfo } from '../TodoInfo';
interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todos: Todos[];
  usersFromServer: Users[];
}

export const TodoList: React.FC<Props> = ({ todos, usersFromServer }) => {
  return (
    <section className="TodoList">
      <TodoInfo todos={todos} usersFromServer={usersFromServer} />
    </section>
  );
};
