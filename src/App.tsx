import { FormEvent, useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [hadFailedSubmit, setHadFailedSubmit] = useState(false);
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    })),
  );
  const getNewId = () => {
    return Math.max(
      ...todos.map(todo => todo.id),
    ) + 1;
  };

  const resetForm = () => {
    setSelectedUserName('');
    setInputTitle('');
    setHadFailedSubmit(false);
  };

  const createTodo = () => {
    const selectedUser = users.find(user => user.name === selectedUserName);

    if (!selectedUser) {
      throw new Error('User with selected name does not exist');
    }

    const newTodo = {
      id: getNewId(),
      title: inputTitle,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputTitle || !selectedUserName) {
      setHadFailedSubmit(true);

      return;
    }

    createTodo();
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            name="title"
            value={inputTitle}
            onChange={({ target }) => setInputTitle(target.value)}
          />

          {(hadFailedSubmit && !inputTitle) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserName}
            onChange={({ target }) => setSelectedUserName(target.value)}
          >
            <option value="" disabled>Choose a user</option>
            {users.map(({ name, id }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>

          {(hadFailedSubmit && !selectedUserName) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
