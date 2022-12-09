import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';
import { Todo } from './components/TodoInfo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [newTodos, setNewTodos] = useState(todos);
  const [isInputError, setIsInputError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  const handleChanges = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const regExInput = /^(.*[a-zA-Z0-9 \u0400-\u04FF])$/gmi;

    if (name === 'titleInput' && value.match(regExInput)) {
      setTitleInput(value);
      setIsInputError(false);
    }

    if (name === 'selectedUser') {
      setSelectedUser(value);
      setIsSelectError(false);
    }
  };

  const addNewTodo = () => {
    if (!(titleInput && (selectedUser !== '0'))) {
      setIsSelectError(true);
      setIsInputError(true);

      return;
    }

    const newId = Math.max(...newTodos.map(todo => todo.id));
    const newTask = {
      id: newId + 1,
      title: titleInput,
      completed: false,
      userId: +selectedUser,
      user: getUser(+selectedUser),
    };

    setNewTodos([
      ...newTodos,
      newTask,
    ]);

    setTitleInput('');
    setSelectedUser('0');
    setIsSelectError(false);
    setIsInputError(false);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="titleInput"
              placeholder="Enter a title"
              value={titleInput}
              onChange={handleChanges}
            />
            {(!titleInput && isInputError) && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="selectedUser"
              value={selectedUser}
              onChange={handleChanges}
            >
              <option value="0" key={0} disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {(selectedUser === '0' && isSelectError) && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
