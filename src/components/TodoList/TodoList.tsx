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

type Props = {
  todos: Todos[];
  users: Users[];
};

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <>
      {todos.map(todo => {
        const currentUser: Users | undefined = users.find(
          user => user.id === todo.userId,
        );

        if (!currentUser) {
          return null;
        }

        return <TodoInfo todo={todo} currentUser={currentUser} key={todo.id} />;
      })}
    </>
  );
};
