import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

const DEFAULT_USER_ID = 0;
const EMPTY_TITLE_ERROR = 'Please enter a title';
const EMPTY_USER_ERROR = 'Please choose a user';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(DEFAULT_USER_ID);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      setTitleErrorMessage(EMPTY_TITLE_ERROR);
      hasError = true;
    } else {
      setTitleError(false);
      setTitleErrorMessage('');
    }

    if (userId === DEFAULT_USER_ID) {
      setUserError(true);
      setUserErrorMessage(EMPTY_USER_ERROR);
      hasError = true;
    } else {
      setUserError(false);
      setUserErrorMessage('');
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(DEFAULT_USER_ID);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (e.target.value.trim() !== '') {
                setTitleError(false);
                setTitleErrorMessage('');
              }
            }}
          />
          {titleError && <span className="error">{titleErrorMessage}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              if (Number(e.target.value) !== DEFAULT_USER_ID) {
                setUserError(false);
                setUserErrorMessage('');
              }
            }}
          >
            <option value={DEFAULT_USER_ID} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userErrorMessage}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
