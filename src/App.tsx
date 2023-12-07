import './App.scss';
import { FC, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types.ts/todos';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todos[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [isSelectUserError, setIsSelectUserError] = useState(false);

  const resetAllForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsSelectUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUser,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);

    resetAllForm();
  };

  const selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsSelectUserError(false);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleOnSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label htmlFor="Title_Form">Title: </label>
          <input
            id="Title_Form"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleHandler}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="Select">User: </label>
          <select
            id="Select"
            data-cy="userSelect"
            value={selectedUser}
            onChange={selectUserHandler}
          >
            <option value={0} disabled>Choose a user</option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {isSelectUserError && (
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
