import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users.json';
import todosFromServer from './api/todos.json';
import { Todos } from './types/todos';
import { TodoList } from './components/TodoList';

const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getMaxId = (todos: Todos[]) => {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleErros] = useState(false);

  const [userId, setUserId] = useState(0);
  const [selectFieldError, setSelectFieldError] = useState(false);

  const validRegex = /^[A-Za-z\u0400-\u04FF0-9\s]+$/;

  const inputValidation = (text: string) => {
    return text.trim().match(validRegex);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle);

    setTitleErros(!newTitle);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectFieldError(false);
  };

  const addTodo = (NewTodo: Todos) => {
    setTodos(currentTodos => [...currentTodos, NewTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleErros(false);
    setSelectFieldError(false);
  };

  function handleSumbit(event: React.FormEvent) {
    event.preventDefault();

    setTitleErros(!inputValidation(title));
    setSelectFieldError(!userId);

    if (!inputValidation(title) || !userId) {
      return;
    }

    addTodo({
      id: getMaxId(todos),
      title,
      userId,
      completed: false,
      user: getUser(userId),
    });

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSumbit}
      >
        <div className="field">
          <label htmlFor="title-id">
            Title:&nbsp;
          </label>

          <input
            value={title}
            id="title-id"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            onChange={handleTitleInput}
          />

          {titleError && (
            <span className="error">
              {!title.trim()
                ? 'Please enter a title'
                : 'Please enter a correct title'}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select-id">
            User:&nbsp;
          </label>

          <select
            value={userId}
            data-cy="userSelect"
            id="select-id"
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(consumer => (
              <option value={consumer.id} key={consumer.id}>
                {consumer.name}
              </option>
            ))}
          </select>

          {selectFieldError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
