import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const preparedTodos = todosFromServer.map(todo => {
  const newTodo = {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: usersFromServer.find(user => user.id === todo.userId),
  };

  return newTodo;
});

const getId = (array: Todo[]) => {
  const ids = array.map(el => el.id);

  return Math.max(...ids) + 1;
}

export const App = () => {
  const [userSelect, setUserSelect] = useState('0');
  const [titleInput, setTitleInput] = useState('');
  const [selectIsValid, setSelectIsValid] = useState(true);
  const [titleIsValid, setTitleIsValid] = useState(true);

  const userChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;

    setSelectIsValid(true);
    setUserSelect(target.value);
  };

  const titleChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    setTitleIsValid(true);
    setTitleInput(target.value);
  };

  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const userError = userSelect === '0';
    const titleError = titleInput.trim().length === 0;

    if (userError) {
      setSelectIsValid(false);
    }

    if (titleError) {
      setTitleIsValid(false);
    }

    if (!titleError && !userError) {
      preparedTodos.push({
        id: getId(preparedTodos),
        title: titleInput,
        completed: false,
        user: usersFromServer[Number(userSelect) - 1],
      });

      setUserSelect('0');
      setTitleInput('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" onSubmit={formSubmitHandler}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={titleChangeHandler}
            placeholder="Enter a title"
          />
          {!titleIsValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={userChangeHandler}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(
              (user, i) => (
                <option
                  value={i + 1}
                  key={user.id}
                >
                  {user.name}
                </option>
              ),
            )}
          </select>

          {!selectIsValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedTodos} />
    </div>
  );
};
