import './App.scss';
import React, { useState } from 'react';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const user = usersFromServer.find(({ id }) => id === userId);

  return user || null;
}

const prepareTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([...prepareTodos]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const generateNewTodo = () => {
    setTodos(currentTodos => (
      [
        ...currentTodos,
        {
          id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
          title,
          completed: false,
          userId: selectedUserId,
          user: getUser(selectedUserId),
        },
      ]
    ));
  };

  const formValidation = () => {
    const regExp = /^[A-Za-zА-Яа-я0-9\s]+$/;

    if (!title.trim().length || !regExp.test(title)) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formValidation();

    if (title.trim().length && selectedUserId) {
      generateNewTodo();
      resetForm();
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
    setUserError(false);
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
            name="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleChangeTitle}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userSelect"
            value={selectedUserId}
            onChange={handleSelectUser}
          >
            <option value={0} disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {userError && (
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
