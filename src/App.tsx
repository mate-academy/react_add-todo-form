import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [text, setText] = useState('');
  const [user, setUser] = useState(0);
  const users = [...usersFromServer];
  const [todos, setTodos] = useState([...todosFromServer]);
  const [errorText, setErrorText] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [touched, setTouched] = useState(false);

  function hendleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorText((touched && !text) || (text.trim() === ''));
    setErrorUser(user === 0);

    if (!touched || (touched && (!text || text.trim() === ''))
      || (touched && user === 0)) {
      return;
    }

    const newIdComment = Math.max(...todos.map((todo) => todo.id), 0) + 1;
    const newComment = {
      id: newIdComment,
      title: text,
      completed: false,
      userId: user,
    };

    setTodos([...todos, newComment]);
    setText('');
    setUser(0);
    setErrorText(false);
    setErrorUser(false);
    setTouched(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={hendleSubmit}>
        <div className="field">
          <label htmlFor="text">Title:</label>
          <input
            id="text"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={text}
            onChange={event => {
              setText(event.target.value);
              setErrorText(false);
            }}
            onBlur={() => setTouched(true)}
          />
          {errorText && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(+event.target.value)}
            onBlur={() => {
              setTouched(true);
              setErrorUser(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map((paramUser) => (
              <option key={paramUser.id} value={paramUser.id}>
                {paramUser.name}
              </option>
            ))}
          </select>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={users}
      />
    </div>
  );
};
