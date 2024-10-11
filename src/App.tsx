import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

const getMaxId = () => {
  if (todosFromServer.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todosFromServer.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [hasErrorMessageTitle, setHasErrorMassageTitle] = useState(false);
  const [hasErrorMessageSelect, setHasErrorMassageSelect] = useState(false);
  const [todosList, setTodosList] = useState(todosFromServer);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    setHasErrorMassageTitle(false);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+e.target.value);
    setHasErrorMassageSelect(false);
  };

  const reset = () => {
    setInputTitle('');
    setSelectUser(0);
    setHasErrorMassageTitle(false);
    setHasErrorMassageSelect(false);
  };

  const addNewTodo = (newTodo: Todo) => {
    setTodosList(prevList => [...prevList, newTodo]);
  };

  const addTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setHasErrorMassageTitle(!inputTitle);
    setHasErrorMassageSelect(!selectUser);

    if (!inputTitle || !selectUser) {
      return;
    }

    addNewTodo({
      id: getMaxId(),
      title: inputTitle,
      userId: selectUser,
      completed: false,
    });
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title:&nbsp;</label>
          <input
            type="text"
            value={inputTitle}
            data-cy="titleInput"
            onChange={handleTitleChange}
            required
            placeholder="Enter a tittle"
            id="titleInput"
          />
          {hasErrorMessageTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;</label>
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={handleChangeSelect}
            required
            id="userSelect"
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
          {hasErrorMessageSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={addTodo}>
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
