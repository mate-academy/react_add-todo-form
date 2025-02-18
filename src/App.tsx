import React, { useEffect, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './Types/InterfaceTodo';

import { TodoList } from './components/TodoList';

import './App.scss';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserID, setSelectedUserID] = useState('0');
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  useEffect(() => {
    setTodos(preparedTodos);
  }, []);

  const addedNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const onUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(event.target.value);
    setIsUserError(false);
  };

  const onReset = () => {
    setTitle('');
    setSelectedUserID('0');
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (selectedUserID === '0') {
      setIsUserError(true);
    }

    if (!title || selectedUserID === '0') {
      return;
    }

    const newId = Math.max(...preparedTodos.map(todo => todo.id));
    const user = usersFromServer.find(
      currentUser => currentUser.id === +selectedUserID,
    );

    if (user) {
      addedNewTodo({
        id: newId + 1,
        title: title,
        user: user,
        completed: false,
        userId: +selectedUserID,
      });
    }

    onReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmitForm}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={onTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserID}
            onChange={onUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={`${user.id}`}>
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
