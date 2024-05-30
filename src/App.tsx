import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [addTodo, setAddTodo] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const validateTitle = /^[A-Za-z|0-9+ ]+$/;

  function getMaxId() {
    addTodo.sort((a: Todo, b: Todo) => b.id - a.id);

    return addTodo[0].id;
  }

  if (userIdError && userId) {
    setUserIdError(false);
  }

  if (titleError && title) {
    setTitleError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();

          setTitleError(!title);
          setUserIdError(!userId);

          if (!validateTitle.test(title.trim()) || !userId) {
            return;
          }

          return setAddTodo(todosArr => {
            setTitle('');
            setUserId(0);

            return [
              ...todosArr,
              {
                title,
                completed: false,
                userId,
                user: getUserById(userId),
                id: getMaxId() + 1,
              },
            ];
          });
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
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
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

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={addTodo} />
    </div>
  );
};
