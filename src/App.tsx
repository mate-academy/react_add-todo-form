import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todos } from './types/TodosUsers';
import { getUserById } from './functions/getUserById';
import { visibleTodos } from './functions/visibleTodos';
import { getMaxId } from './functions/getMaxId';

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(visibleTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState(0);

  const handlerTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+event.target.value);
    setHasSelectError(false);
  };

  const reset = () => {
    setHasTitleError(false);
    setHasSelectError(false);
    setTitle('');
    setSelect(0);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasSelectError(!select);

    if (!title.trim() || !select) {
      return;
    }

    if (title && select) {
      const newTodo = {
        id: getMaxId(todos),
        title,
        completed: false,
        userId: select,
        user: getUserById(select),
      };

      setTodos(prevTodos => {
        return [...prevTodos, newTodo];
      });
    }

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
          </label>

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            value={title}
            onChange={handlerTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">
            User:&nbsp;
          </label>
          <select
            data-cy="userSelect"
            id="select"
            value={select}
            onChange={handlerSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectError
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
