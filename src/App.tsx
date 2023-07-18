import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => (
  usersFromServer.find(({ id }) => (
    userId === id)
    || null)
);

const todosWithUser: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const getMaxId = () => (
    Math.max(...currentTodos.map((todo) => todo.id))
  );

  const addTodos = (newTodo: Todo) => {
    setCurrentTodos(
      previousTodos => [...previousTodos, newTodo],
    );
  };

  const reset = () => {
    setSelectedUserId(0);
    setUserIdError(false);
    setTitle('');
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserIdError(!selectedUserId);
    setTitleError(!title.trim().length);

    if (!selectedUserId || !title.trim().length) {
      return;
    }

    if (!titleError && !userIdError) {
      const newTodo: Todo = {
        id: getMaxId() + 1,
        title: title.trim(),
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      addTodos(newTodo);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
          />

          {titleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userIdError
            && (<span className="error">Please choose a user</span>)}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
