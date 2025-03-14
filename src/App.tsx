import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuidv4(),
      title: 'delectus aut autem',
      userId: 1,
      completed: false,
      user: users.find(user => user.id === 1),
    },
    {
      id: uuidv4(),
      title: 'quis ut nam facilis et officia qui',
      userId: 4,
      completed: false,
      user: users.find(user => user.id === 4),
    },
  ]);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(prev => ({ ...prev, title: true }));

      return;
    }

    if (userId === 0) {
      setError(prev => ({ ...prev, user: true }));

      return;
    }

    const selectedUser = users.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setError({ title: false, user: false });
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
              setError(prev => ({ ...prev, title: false }));
            }}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setError(prev => ({ ...prev, user: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
