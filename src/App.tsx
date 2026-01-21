import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

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

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: user || { id: 0, name: '', username: '', email: '' },
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g, '');

    setTitle(filteredValue);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = userId !== 0;

    if (!isTitleValid || !isUserValid) {
      setTitleError(!isTitleValid);
      setUserError(!isUserValid);

      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (selectedUser) {
      const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

      const newTodo: Todo = {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: userId,
        user: selectedUser,
      };

      setTodos(prev => [...prev, newTodo]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            Title:&nbsp;
          </label>

          <input
            id="post-title"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user-id">
            User:&nbsp;
          </label>

          <select
            id="post-user-id"
            value={userId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

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
