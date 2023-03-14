import { FC, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: FC = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [selectUserId, setSelectUserId] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [todoForList, setTodoForList] = useState('');

  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidSelect, setIsValidSelect] = useState(false);

  function checkValidInput() {
    setTodoForList(newTodoTitle.replace(/[^A-Za-z\s\d\u0400-\u04FF]/g, ''));

    if (selectUserId === 0 || todoForList === '') {
      setIsValidSelect(selectUserId === 0);
      setIsValidTitle(newTodoTitle === '');

      return true;
    }

    return false;
  }

  const resetForm = () => {
    setSelectUserId(0);
    setNewTodoTitle('');
    setIsValidTitle(false);
    setIsValidSelect(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkValidInput()) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(({ id }) => id)) + 1,
      title: todoForList,
      completed: false,
      userId: selectUserId,
    };

    setTodos([...todos, newTodo]);
    resetForm();
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
    setIsValidTitle(false);
  };

  const handleOnChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectUserId(+event.target.value);
    setIsValidSelect(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <label className="field">
          {'Title: '}
          <input
            type="text"
            placeholder="enter a title"
            data-cy="titleInput"
            value={newTodoTitle}
            onChange={handleOnChangeInput}
          />
          {isValidTitle
          && <span className="error">Please enter a title</span>}
        </label>

        <div className="field">
          {'Choose a user: '}
          <select
            data-cy="userSelect"
            value={selectUserId}
            onChange={handleOnChangeSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {isValidSelect
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
