import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(serverTodo => {
  const foundUser = usersFromServer.find(
    candidateUser => candidateUser.id === serverTodo.userId,
  );

  return {
    ...serverTodo,
    user: foundUser!,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
          setHasTitleError(title.trim() === '');
          setHasUserError(userId === 0);
          if (title.trim() === '' || userId === 0) {
            return;
          }

          const foundUser = usersFromServer.find(
            candidateUser => candidateUser.id === userId,
          );
          const id = Math.max(0, ...todos.map(todo => todo.id)) + 1;

          const todo = {
            id: id,
            title: title,
            userId: userId,
            completed: false,
            user: foundUser!,
          };

          setTodos([...todos, todo]);

          setTitle('');
          setUserId(0);
        }}
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(
                event.target.value.replace(
                  /[^a-zабвгґдеєжзиіїйклмнопрстуфхцчшщьюя0-9 ]/gi,
                  '',
                ),
              );
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
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
