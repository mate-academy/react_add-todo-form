import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todos';
import { Error } from './types/Error';

const todos = todosFromServer.map(todo => {
  const userFind = usersFromServer.find(user => user.id === todo.userId);

  return { ...todo, user: userFind };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('0');
  const [error, setError] = useState<Error>({
    input: false,
    select: false,
  });

  const addTodo = () => {
    const newId =
      visibleTodos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1;

    const searchedUser = usersFromServer.find(
      user => user.id === +selectedUser,
    );

    if (!searchedUser) {
      return;
    }

    const newTodo = {
      id: newId,
      title: inputValue,
      completed: false,
      userId: searchedUser.id,
      user: searchedUser,
    };

    setVisibleTodos(prevTodo => [...prevTodo, newTodo]);
  };

  const validateForm = () => {
    const newErrors = {
      input: inputValue.trim() === '',
      select: selectedUser === '0',
    };

    setError(newErrors);

    if (newErrors.input || newErrors.select) {
      return;
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    addTodo();

    setInputValue('');
    setSelectedUser('0');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setError({ ...error, input: false });
  };

  const handleSelectedUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setError({ ...error, select: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => handleFormSubmit(event)}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <input
            onChange={event => handleInputChange(event)}
            value={inputValue}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {error.input && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={selectedUser}
            onChange={event => handleSelectedUser(event)}
            data-cy="userSelect"
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
          {error.select && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
