import { ChangeEvent, FC, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

enum Field {
  Title = 'title',
  Select = 'select',
}

const getUserById = (id: number) => (
  usersFromServer.find(user => user.id === id) || null
);

const todos = (): Todo[] => todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [vissibleTodos, setVissibleTodos] = useState<Todo[]>(todos);
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const reset = () => {
    setInputTitle('');
    setSelectedUser(0);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case Field.Title:
        setInputTitle(value.replace(/[^A-Za-zА-Яа-яЁё\s]/g, ''));
        setShowTitleError(false);
        break;

      case Field.Select:
        setSelectedUser(Number(event.target.value));
        setShowUserError(false);
        break;

      // eslint-disable-next-line no-useless-escape
      default: throw new Error('Something went wrong ¯\_(ツ)_/¯');
        break;
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = inputTitle.trim();
    const foundUser = getUserById(Number(selectedUser));
    const newId = Math.max(...vissibleTodos.map(todo => todo.id)) + 1;

    if (!trimedTitle) {
      setShowTitleError(true);
    }

    if (!selectedUser) {
      setShowUserError(true);
    }

    if (!trimedTitle || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: inputTitle,
      completed: false,
      userId: selectedUser,
      user: foundUser,
    };

    setVissibleTodos([...vissibleTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label>
            Title:&nbsp;

            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              name={Field.Title}
              value={inputTitle}
              onChange={handleChange}
            />
          </label>

          {showTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select">
            User:&nbsp;

            <select
              id="select"
              data-cy="userSelect"
              name={Field.Select}
              value={selectedUser}
              onChange={handleChange}
            >
              <option value={0} disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}

            </select>
          </label>
          {showUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={vissibleTodos} />
    </div>
  );
};
