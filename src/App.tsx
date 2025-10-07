import './App.scss';
import { useEffect, useState, FormEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({ title: false, user: false });

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(
      todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId)!,
      })),
    );
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim() !== '';
    const hasUser = userId !== '';

    setErrors({ title: !hasTitle, user: !hasUser });
    if (!hasTitle || !hasUser) {
      return;
    }

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const user = users.find(u => u.id === Number(userId));

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title,
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);

              if (errors.title && event.target.value.trim() !== '') {
                setErrors(prev => ({ ...prev, title: false }));
              }
            }}
            placeholder="Enter todo title"
          />

          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              const selected = event.target.value;

              setUserId(selected);

              // Clear user error when a valid user is selected
              if (errors.user && selected !== '') {
                setErrors(prev => ({ ...prev, user: false }));
              }
            }}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
