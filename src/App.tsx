import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

type Case = 'id' | 'title';

const findUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const getTodoId = (todos: Todo[]): number => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasIdError, setHasIdError] = useState(false);
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const addTodo = (newTodo: Todo) => {
    setNewTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    caseType: Case,
  ) => {
    if (caseType === 'title') {
      setTitle(event.target.value);
      setHasTitleError(false);
    }

    if (caseType === 'id') {
      setUserId(+event.target.value);
      setHasIdError(false);
    }

    return;
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title) {
      setHasTitleError(true);
      hasError = true;
    } else {
      setHasTitleError(false);
    }

    if (userId === 0) {
      setHasIdError(true);
      hasError = true;
    } else {
      setHasIdError(false);
    }

    if (hasError) {
      return;
    } else {
      addTodo({
        id: getTodoId(newTodos),
        title: title,
        completed: false,
        userId: userId,
        user: findUserById(userId),
      });

      setUserId(0);
      setTitle('');
      setHasTitleError(false);
      setHasIdError(false);

      return;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleOnSubmit(event)}
      >
        <div className="field">
          <label className="label" htmlFor="title">
            Title:&nbsp;
          </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => handleOnChange(event, 'title')}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="userSelect">
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            value={userId}
            id="userSelect"
            onChange={event => handleOnChange(event, 'id')}
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

          {hasIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
