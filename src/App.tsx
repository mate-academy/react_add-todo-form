import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
// import { UserInfo } from './components/UserInfo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = userId !== 0;

    setShowTitleError(!isTitleValid);
    setShowUserError(!isUserValid);

    if (isTitleValid && isUserValid) {
      const selectedUser = usersFromServer.find(user => user.id === userId);

      if (!selectedUser) {
        return;
      }

      const nextId =
        todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;

      const newTodo = {
        id: nextId,
        title: title,
        userId: userId,
        completed: false,
        user: {
          id: selectedUser.id,
          name: selectedUser.name,
          username: selectedUser.username,
          email: selectedUser.email,
        },
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  const todosWithUsers = todos.map(todo => {
    const user = usersFromServer.find(userOne => userOne.id === todo.userId);

    return {
      ...todo,
      user: todo.user || user,
    };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:&nbsp;&nbsp;
            <input
              type="text"
              value={title}
              placeholder="enter a title"
              data-cy="titleInput"
              onChange={event => {
                setTitle(event.target.value);
                if (showTitleError) {
                  setShowTitleError(false);
                }
              }}
            />
          </label>

          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="sel">User:&nbsp;&nbsp;</label>

          <select
            id="sel"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              if (showUserError) {
                setShowUserError(false);
              }
            }}
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

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
