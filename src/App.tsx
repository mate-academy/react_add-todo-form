import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './Interfaces/intTodo';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

const getTodoWithUsers = () => {
  return todosFromServer.map(todo => {
    const user = usersFromServer.find(currUser => currUser.id === todo.userId);

    if (!user) {
      throw new Error(`No user found for todo with ID: ${todo.id}`);
    }

    return { ...todo, user };
  });
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodoWithUsers());
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const validateTitle = (value: string) => value.trim().length > 0;
  const validateUser = (userId: number) => userId !== 0;

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);
    setIsTitleError(!validateTitle(value));
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;

    setSelectedUserId(value);
    setIsUserError(!validateUser(value));
  };

  const addNewTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateTitle(title) || !validateUser(selectedUserId)) {
      setIsTitleError(!validateTitle(title));
      setIsUserError(!validateUser(selectedUserId));

      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const user = usersFromServer.find(
      currUser => currUser.id === selectedUserId,
    );

    if (user) {
      addNewTodo({
        userId: selectedUserId,
        id: newId,
        title,
        completed: false,
        user,
      });
    }

    setTitle('');
    setSelectedUserId(0);
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
