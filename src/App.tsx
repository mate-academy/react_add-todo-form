import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [count, setCount] = useState(0);
  const todosWithUser = todosFromServer.map(todo => {
    const userForTodo = usersFromServer.find(
      userFromServer => userFromServer.id === todo.userId,
    );

    return {
      ...todo,
      user: userForTodo,
    };
  });
  const [todos, setTodos] = useState(todosWithUser);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    const user: User | undefined = usersFromServer.find(
      userFromServer => userFromServer.id === +selectedUser,
    );

    if (!user) {
      setHasUserError(true);
    }

    if (!user || !title) {
      return;
    }

    const newTodo: Todo = {
      id: todos[todos.length - 1].id + 1,
      title: title,
      userId: user.id,
      completed: false,
      user: user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setCount(currentCount => currentCount + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        noValidate
        onSubmit={handleSubmit}
        key={count}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:{' '}
            <input
              id="titleInput"
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:{' '}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>
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
          </label>
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
