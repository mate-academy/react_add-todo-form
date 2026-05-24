import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User {
  return usersFromServer.find(user => user.id === userId)!;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = userId === 0;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g, ''));
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (userError) {
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
