import './App.scss';
import { FormEvent, useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { generateId } from './services';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const addOne = (todo: Todo) => {
    setTodos((currentTodos) => [...currentTodos, todo]);
  };

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (title.trim() && userId) {
      addOne({
        title,
        userId,
        id: generateId(todos),
        completed: false,
      });
      setTitle('');
      setUserId(0);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={handleUser}>
            <option value="0">Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
