import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/types/interface';

function getMaxTodoId(todos: Todo[]) {
  return Math.max(...todos.map(({ id }) => id)) + 1;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [visibleTodos, addTodo] = useState(todos);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const isValidTitle = !!trimmedTitle;

    setShowTitleError(!isValidTitle);

    const isValidUser = !!userSelect;

    setShowUserError(!isValidUser);

    if (isValidTitle && isValidUser) {
      const user = usersFromServer
        .find(({ name }) => name === userSelect) || null;
      const newId = getMaxTodoId(visibleTodos);
      const newTodo: Todo = {
        id: newId,
        title: trimmedTitle,
        completed: false,
        userId: user?.id ?? null,
        user,
      };

      addTodo(state => [...state, newTodo]);
      setUserSelect('');
      setTitle('');
      setShowTitleError(false);
      setShowUserError(false);
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTitle(input.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
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

          {showTitleError && (
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

          {showUserError && (
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
