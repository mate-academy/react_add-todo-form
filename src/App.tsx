import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './Interfaces/intTodo';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const addNewTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (isTitleError && e.target.value.trim()) {
      setIsTitleError(false);
    } else if (!isTitleError && !e.target.value.trim()) {
      setIsTitleError(true);
    }
  };

  const onUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    if (+e.target.value !== 0) {
      setIsUserError(false);
    }
  };

  const onResetForm = (): void => {
    setTitle('');
    setSelectedUserId(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setIsTitleError(true);
      hasError = true;
    }

    if (selectedUserId === 0) {
      setIsUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const user = usersFromServer.find(
      currentUser => currentUser.id === selectedUserId,
    );

    if (user) {
      addNewTodo({
        userId: selectedUserId,
        id: newId,
        title: title,
        completed: false,
        user: user,
      });
    }

    onResetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form data-cy="form" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter the title"
            onChange={onTitleChange}
          />

          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={selectedUserId}
            onChange={onUserChange}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
