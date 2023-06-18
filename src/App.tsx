import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getPreparedData } from './helpers/getPreparedData';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getId } from './helpers/getId';
import { Todo } from './Types';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleQueue, setTitleQueue] = useState('');
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);

  const preparedData = getPreparedData(
    todosFromServer,
    usersFromServer,
  );

  const addNewTodo = (
    userId: number,
    title: string,
    todos: Todo[],
  ) => {
    const newTodo: Todo = {
      id: getId(todosFromServer),
      title,
      completed: false,
      userId,
    };

    todos.push(newTodo);
  };

  const clearForm = () => {
    setSelectedUser(0);
    setTitleQueue('');
  };

  const handleFormSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();
    const isInputsValid = selectedUser && titleQueue;

    if (isInputsValid) {
      clearForm();
      setIsFieldsEmpty(false);
      addNewTodo(selectedUser, titleQueue, todosFromServer);
    } else {
      setIsFieldsEmpty(true);
    }
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitleQueue(e.target.value);
  };

  const handleUserSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              value={titleQueue}
              onChange={handleTitleChange}
            />
          </label>
          {(isFieldsEmpty && !titleQueue)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              name="username"
              value={selectedUser}
              onChange={handleUserSelect}
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
          </label>

          {(isFieldsEmpty && !selectedUser)
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedData} />
    </div>
  );
};
