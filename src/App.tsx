import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

export const App: React.FC = () => {
  const todos: TodoItem[] = todosFromServer;
  const users: User[] = usersFromServer;
  const todosWithUsers: TodoItem[] = todos.map(todo => {
    const currentUser = users.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: currentUser,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
