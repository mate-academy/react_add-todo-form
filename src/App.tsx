import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [userIdError, setUserIdError] = useState(false);
  const [inputTitleError, setInputTitleError] = useState(false);
  const [userIdTouched, setUserIdTouched] = useState(false);
  const [inputTitleTouched, setInputTitleTouched] = useState(false);

  const [userId, setUserId] = useState(0);
  const [inputTitle, setInputTitle] = useState('');

  const resetFunc = () => {
    setUserId(0);
    setInputTitle('');
    setUserIdTouched(false);
    setInputTitleTouched(false);
  };

  const handleInputChange = (newInput: string) => {
    if (inputTitleTouched) {
      setInputTitleError(false);
    }

    setInputTitle(newInput);
  };

  const handleUserChange = (newUser: number) => {
    if (userIdTouched) {
      setUserIdError(false);
    }

    setUserId(newUser);
  };

  const handleAddClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setUserIdTouched(true);
    setInputTitleTouched(true);

    let hasError = false;

    if (!userId) {
      setUserIdError(true);
      hasError = true;
    } else {
      setUserIdError(false);
    }

    if (!inputTitle.length) {
      setInputTitleError(true);
      hasError = true;
    } else {
      setInputTitleError(false);
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      id: [...todos].sort((todo1, todo2) => todo2.id - todo1.id)[0].id + 1,
      title: inputTitle,
      completed: false,
      userId,
    };

    setTodos((curentTodos) => [...curentTodos, newTodo]);
    resetFunc();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputTitle}
            onChange={(event) => handleInputChange(event.target.value)}
          />
          {inputTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            required
            value={userId}
            name="userId"
            onChange={(event) => handleUserChange(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddClick}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
