import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoInterface, getUsersById, getMaxVal } from './types/types';

export const App = () => {
  const initialTodos: TodoInterface[] = todosFromServer.map(todo => ({
    user: getUsersById(todo.id),
    ...todo,
  }));

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const getSpecificArr: number[] = todos.map(e => e.id);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''); // Only allow letters, digits, and spaces

    setTitle(inputValue);
    setTitleError(false);
  };

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setUserId(Number(e.target.value));
    setSelectError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setSelectError(false);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim().length || userId === 0) {
      if (!title.trim().length) {
        setTitleError(true);
      }

      if (userId === 0) {
        setSelectError(true);
      }

      return;
    }

    const newData: TodoInterface = {
      user: getUsersById(userId),
      id: getMaxVal(getSpecificArr),
      title,
      completed: false,
      userId: getMaxVal(getSpecificArr),
    };

    setTodos(prev => [...prev, newData]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            onChange={inputChangeHandler}
            value={title}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            defaultValue="0"
            onChange={selectChangeHandler}
            value={userId}
          >
            <option key="0" value="0">
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
