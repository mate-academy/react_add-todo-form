import './App.scss';
import { FormEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (userId === 0 || title.length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(item => item.id + 1)),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label htmlFor="title">Title:  </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:  </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
