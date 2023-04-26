import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/interface';
import { TodoList } from './components/TodoList';

function getUserByName(nameUser: string) {
  return usersFromServer.find(({ name }) => name === nameUser) || null;
}

function getUserById(userId: number) {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function showHint(showOnStart: boolean, value: string) {
  return showOnStart && !value;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [visibleTodos, addTodo] = useState(todos);
  const [showOnStart, setShowOnStart] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowOnStart(true);

    const isValidTitle = title.split('').every(letter => letter === ' ');

    if (isValidTitle) {
      setTitle('');
    }

    if (!isValidTitle && userSelect) {
      const user = getUserByName(userSelect);
      const newId = Math.max(...visibleTodos.map(({ id }) => id)) + 1;
      const todo = {
        id: newId,
        title,
        completed: false,
        userId: user ? user.id : null,
      };

      const newTodo = {
        ...todo,
        user,
      };

      addTodo(state => [...state, newTodo]);
      setUserSelect('');
      setTitle('');
      setShowOnStart(false);
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const regex = /[^a-zA-Zа-яА-Я0-9\s]/g;
    const output = input.replace(regex, '');

    setTitle(output);
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => (
    setUserSelect(event.target.value));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>Titile: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="EnterTitle"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {showHint(showOnStart, title) && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={handleChangeSelect}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(({ name, id }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {showHint(showOnStart, userSelect) && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
