import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getUsersById } from './functions/getUsers';
import { TodoInterface } from './types/TodoInterface';
import { getMaxVal } from './functions/getMaxVal';

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
    setTitle(e.target.value);
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
          <select
            data-cy="userSelect"
            defaultValue="0"
            onChange={selectChangeHandler}
            value={userId}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id}>{name}</option>
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
