import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [text, setText] = useState('');
  const [user, setUser] = useState('0');

  const [textError, setTextError] = useState(false);
  const [userError, setUserError] = useState(false);

  function checkSumbit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTextError(false);
    setUserError(false);

    let hasError = false;
    if (!text || text === '') {
      setTextError(true);
      hasError = true;
    }

    if (!user || user === '0') {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    } else {
      const biggestID = Math.max(...todos.map(el => el.id));

      const newTodo: Todo = {
        id: biggestID + 1,
        title: text,
        completed: false,
        userId: Number(user),
      };

      setTodos([...todos, newTodo]);
      setText('');
      setUser('0');
    }

    return;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={checkSumbit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={text}
            onChange={e => {
              setText(e.target.value);
              setTextError(false);
            }}
          />
          {textError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={e => {
              setUser(e.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return <option value={user.id}>{user.name}</option>;
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
