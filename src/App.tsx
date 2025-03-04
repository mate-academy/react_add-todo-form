import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  const functionHasErrorTitle = () => {
    if (title.length < 1) {
      setHasErrorTitle(true);

      return true;
    }

    return false;
  };

  const functionHasErrorUser = () => {
    if (user === 0) {
      setHasErrorUser(true);

      return true;
    }

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const newToDo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      completed: false,
      userId: Number(user),
    };

    const userError = functionHasErrorUser();
    const titleError = functionHasErrorTitle();

    if (userError || titleError) {
      return;
    }

    setTodos(prevToDos => [...prevToDos, newToDo]);

    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={newValue => {
              setTitle(newValue.target.value);
              setHasErrorTitle(false);
            }}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="choose user">User: </label>
          <select
            data-cy="userSelect"
            value={user || 0}
            id="choose user"
            onChange={newUser => {
              setUser(+newUser.target.value);
              setHasErrorUser(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(oneUser => {
              return (
                <option value={oneUser.id} key={oneUser.id}>
                  {oneUser.name}
                </option>
              );
            })}
          </select>

          {hasErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
