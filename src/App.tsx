import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/todo';

function getUserById(id: number) {
  return usersFromServer.find(user => user.id === id) || null;
}

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodo] = useState(todosWithUsers);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  function getNewTodoId(todosForId: TodoWithUser[]) {
    const maxId = Math.max(...todosForId.map(todo => todo.id));

    return maxId + 1;
  }

  function handleSetTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    if (!event.target.value) {
      setTitleError(true);

      return;
    }

    setTitleError(false);
  }

  function handleSetUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);

    if (+event.target.value === 0) {
      setUserIdError(true);

      return;
    }

    setUserIdError(false);
  }

  function reset() {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      user: getUserById(userId),
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleSetTitle}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User:&nbsp;</label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleSetUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user?.id}
                key={user?.id}
              >
                {user?.name}
              </option>
            ))}
          </select>

          {userIdError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
