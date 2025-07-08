import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelected, setUserSelected] = useState('');
  const [allTodos, setAllTodos] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const todosWithUsers = allTodos.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userSelected) {
      setUserError(true);
    }

    if (title && userSelected) {
      const newId = Math.max(...allTodos.map(todo => todo.id)) + 1;
      const user = usersFromServer.find(u => u.email === userSelected);

      if (user) {
        const newTodo = {
          id: newId,
          title: title,
          completed: false,
          userId: user.id,
          user: user,
        };

        setAllTodos([...allTodos, newTodo]);
      }

      setTitle('');
      setUserSelected('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            id="title"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            required
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            data-cy="userSelect"
            value={userSelected}
            id="userSelect"
            onChange={event => {
              setUserSelected(event.target.value);
              setUserError(false);
            }}
            required
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => {
              return (
                <option key={u.id} value={u.email}>
                  {u.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
