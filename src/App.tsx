import { useState, ChangeEvent } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { ToDo } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId:number | null) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const extendedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
} || null));

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(extendedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setselectedUserId] = useState<number | null>(null);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (titleError !== '') {
      setTitleError('');
    }

    setTitle(event.target.value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (userError !== '') {
      setUserError('');
    }

    setselectedUserId(Number(event.target.value));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError('Please enter a title');
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
    }

    if (!selectedUserId || !title.trim()) {
      return;
    }

    setTodos((prevTodos) => {
      const maxTodoId = Math.max(...prevTodos.map(todo => todo.id));

      const newTodo: ToDo = {
        id: maxTodoId + 1,
        title,
        userId: maxTodoId,
        completed: false,
        user: findUserById(selectedUserId),
      };

      return [
        ...prevTodos,
        newTodo,
      ];
    });

    setTitle('');
    setselectedUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId !== null ? String(selectedUserId) : ''}
            onChange={handleUserChange}
            defaultValue=""
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
