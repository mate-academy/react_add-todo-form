import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [userChosen, setUserChosen] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);
  const id = Math.max(...todos.map(item => item.id)) + 1;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorSelect(userChosen === 0);
    setErrorTitle(!title);

    if (!title || userChosen === 0) {
      return;
    }

    setTodos(initialTodos => [
      ...initialTodos,
      { id: id, title: title, completed: false, userId: userChosen },
    ]);
    setTitle('');
    setUserChosen(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={ev => {
              setTitle(ev.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userChosen}
            id="userSelect"
            onChange={ev => {
              setUserChosen(+ev.target.value);
              setErrorSelect(false);
            }}
          >
            <option value={0} disabled={userChosen !== 0}>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
