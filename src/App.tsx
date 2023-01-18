import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/Types/Todo';
import { User } from './components/Types/User';
import 'bulma/css/bulma.css';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [todos, setTodos] = useState(preparedTodos);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (isErrorOnTitleInput) {
      setErrorOnTitleInput(false);
    }
  };

  const handleUserChange = (value: string) => {
    setSelectedUserId(value);
    if (isErrorOnUserSelect) {
      setErrorOnUserSelect(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUserId) {
      setErrorOnTitleInput(!title);
      setErrorOnUserSelect(!selectedUserId);

      return;
    }

    if (selectedUserId && title) {
      const maxTodoId = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todo = {
        title,
        userId: +selectedUserId,
        completed: false,
        id: maxTodoId + 1,
        user: findUserById(+selectedUserId),
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setSelectedUserId('');
    }
  };

  return (
    <div className="App">
      <h1 className="title is-1">Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">

          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            value={title}
            className="input is-rounded"
            placeholder="Enter title of task"
            onChange={(event) => handleTitleChange(event.target.value)}
          />

          {isErrorOnTitleInput && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
            className="label"
          >
            Choose user:
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUserId}
            className="input is-rounded"
            onChange={(event) => handleUserChange(event.target.value)}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {isErrorOnUserSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary is-light is-medium is-rounded"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
