import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(u => u.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
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

          const hasTitleError = title.trim() === '';
          const hasUserError = userId === 0;

          setTitleError(hasTitleError);
          setUserError(hasUserError);

          if (hasTitleError || hasUserError) {
            return;
          }

          const user = usersFromServer.find(u => u.id === userId);

          if (!user) {
            return;
          }

          const newTodo = {
            id: Math.max(...todos.map(t => t.id)) + 1,
            title: title.trim(),
            completed: false,
            userId,
            user,
          };

          setTodos(current => [...current, newTodo]);
          setTitle('');
          setUserId(0);
          setTitleError(false);
          setUserError(false);
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            data-cy="titleInput"
            type="text"
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
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
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
