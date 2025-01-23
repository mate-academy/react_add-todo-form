import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return (
          <TodoInfo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={user}
          />
        );
      })}
    </div>
  );
};
