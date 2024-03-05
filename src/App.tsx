import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(person => person.id === todo.userId) || null,
}));

const getMaxNumber = (todo: Todos[]) => {
  const onAdd = Math.max(...todo.map(t => t.id));

  return onAdd + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [users, setUsers] = useState(0);
  const [usersError, setUserError] = useState(false);

  const [title, setTitle] = useState('');
  const [titleEror, setTitleError] = useState(false);

  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedUser, setTouchedUser] = useState(false);

  const reset = () => {
    setTitle('');
    setUsers(0);
    setTouchedTitle(false);
    setTouchedUser(false);
    setTitleError(false);
    setUserError(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !users) {
      setTitleError(!title.trim());
      setUserError(!users);

      return;
    }

    setTitleError(!title);
    setUserError(!users);

    const newPost: Todos = {
      id: getMaxNumber(todos),
      title,
      completed: false,
      userId: users,
      user: usersFromServer.find(person => person.id === users) || null,
    };

    setTodos(prevValue => [...prevValue, newPost]);
    reset();
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUsers(+e.target.value);
    setTitleError(!title);
    setUserError(!users);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const hasTouchedTitle =
    (touchedTitle && !title) || (!title.trim() && titleEror);
  const hasTouchedUser = (touchedUser && !users) || (!users && usersError);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleLabel">Title: </label>
          <input
            value={title}
            onChange={handleChangeTitle}
            id="titleLabel"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            onBlur={() => setTouchedTitle(true)}
          />
          {hasTouchedTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userLabel">User: </label>
          <select
            id="titleLabel"
            data-cy="userSelect"
            value={users}
            onChange={handleUserChange}
            onBlur={() => setTouchedUser(true)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasTouchedUser && (
            <span className="error">Please choose a user</span>
          )}
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
