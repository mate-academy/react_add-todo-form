import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);
  const [selectValue, setSelectValue] = useState('0');
  const [currentTodos, setCurrentTodos] = useState(todos);

  function handleButtonSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let hasError = false;

    if (title.trim().length === 0) {
      setHasErrorTitle(true);
      hasError = true;
    }

    if (selectValue === '0') {
      setHasErrorUser(true);
      hasError = true;
    }

    if (!hasError) {
      const newTodo = {
        userId: parseInt(selectValue),
        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        title: title,
        completed: false,
        user: getUserById(parseInt(selectValue)),
      };

      setCurrentTodos([...currentTodos, newTodo]);
      setTitle('');
      setSelectValue('0');
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => handleButtonSubmit(event)}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <span>Title: </span>
          <input
            onChange={event => {
              setHasErrorTitle(false);
              setTitle(event.target.value);
            }}
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
          />
          {hasErrorTitle && (
            <span className="error">Please enter a title </span>
          )}
        </div>

        <div className="field">
          <span className="">User: </span>
          <select
            value={selectValue}
            onChange={event => {
              setHasErrorUser(false);
              setSelectValue(event.target.value);
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {hasErrorUser && <span className="error">Please choose a user </span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
