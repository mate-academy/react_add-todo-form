import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={event => {
          event.preventDefault();

          const hasTitleError = !title.trim();
          const hasUserError = !userId;

          setTitleError(hasTitleError);
          setUserError(hasUserError);

          if (hasTitleError || hasUserError) {
            return;
          }

          const selectedUser = usersFromServer.find(
            user => user.id === Number(userId),
          );

          if (!selectedUser) {
            return;
          }

          const newTodo = {
            id: Math.max(...todos.map(todo => todo.id)) + 1,
            title: title.trim(),
            userId: selectedUser.id,
            completed: false,
            user: selectedUser,
          };

          setTodos(currentTodos => [...currentTodos, newTodo]);

          setTitle('');
          setUserId('');
        }}
      >
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label htmlFor="user">User</label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
