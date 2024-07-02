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
    <div>
      {todos.map(todo => {
        const user = users.find(tempUser => tempUser.id === todo.userId);

        return (
          <TodoInfo
            key={todo.id}
            title={todo.title}
            id={todo.id}
            completed={todo.completed}
            email={user?.email || 'unknown'}
            name={user?.name || 'unknown'}
          />
        );
      })}
    </div>
  );
};
