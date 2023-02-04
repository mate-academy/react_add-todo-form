import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  // const [name, setName] = useState('Choose a user');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasNameError, setHasNameError] = useState(false);
  const [allTodos, setAllTodos] = useState(todos);

  function getNewTodoId(todosArr: Todo[]) {
    const mxTodoId = todosArr
      .reduce((prevId, todo) => Math.max(prevId, todo.id), 0);

    return mxTodoId + 1;
  }

  function handleFormSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasNameError(true);
    }

    const newTodo = {
      id: getNewTodoId(allTodos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (title.trim() && userId) {
      setAllTodos(currentTodos => [
        ...currentTodos,
        newTodo,
      ]);

      setTitle('');
      setUserId(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            name="title"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />

          {hasTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>

          <select
            data-cy="userSelect"
            id="userInput"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasNameError(false);
            }}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasNameError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
