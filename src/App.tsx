import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';
import { User } from './type/User';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

let maxId = Math.max(...todos.map(todo => todo.id));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const createNewTodo = () => {
    maxId += 1;

    return {
      id: maxId,
      title,
      completed: false,
      userId: Number(selectedUserId),
      user: getUserById(Number(selectedUserId)),
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectedUserId);

    if (title && selectedUserId) {
      const newTodo = createNewTodo();

      setVisibleTodos([
        ...visibleTodos,
        newTodo,
      ]);

      setTitle('');
      setSelectedUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">{'Title: '}</label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(event.target.value);
              setHasUserError(false);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
