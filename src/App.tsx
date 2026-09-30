import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          const hasTitleError = !title.trim();
          const hasUserError = selectedUserId === 0;

          setTitleError(hasTitleError);
          setUserError(hasUserError);

          if (hasTitleError || hasUserError) {
            return;
          }

          const selectedUser = usersFromServer.find(
            user => user.id === selectedUserId,
          )!;
          const newId = Math.max(...todos.map(todo => todo.id)) + 1;
          const newTodo = {
            id: newId,
            title: title.trim(),
            completed: false,
            userId: selectedUserId,
            user: selectedUser,
          };

          setTodos([...todos, newTodo]);
          setTitle('');
          setSelectedUserId(0);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setUserError(false);
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
