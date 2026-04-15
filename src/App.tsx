import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(true);
  const [userError, setUserError] = useState(true);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          const newId = Math.max(...todos.map(todo => todo.id)) + 1;
          const newTodo = {
            id: newId,
            title: title,
            completed: false,
            userId: userId,
          };

          const isTitleEmpty = title.trim() === '';
          const isUserNotSelected = userId === 0;

          setTitleError(!isTitleEmpty);
          setUserError(!isUserNotSelected);

          if (!isTitleEmpty && !isUserNotSelected) {
            setTodos(prev => [...prev, newTodo]);
            setTitle('');
            setUserId(0);
          }
        }}
      >
        <label>
          Title:
          <div className="field">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                setTitle(event.target.value);
                setTitleError(true);
              }}
            />
            <span className="error" hidden={titleError}>
              Please enter a title
            </span>
          </div>
        </label>

        <label>
          User:
          <div className="field">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={user => {
                setUserId(+user.target.value);
                setUserError(true);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
            <span className="error" hidden={userError}>
              Please choose a user
            </span>
          </div>
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} users={usersFromServer} />
      </section>
    </div>
  );
};
