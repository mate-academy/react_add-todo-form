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
  const [selectedUser, setUser] = useState('0');
  const [newTodos, setNewTodos] = useState(todos);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  function handleChanges(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    const regExInput = /^(.*[a-zA-Z0-9 \u0400-\u04FF])$/gmi;

    if (name === 'titleInput' && value.match(regExInput)) {
      setTitleInput(value);
      setInputError(false);
    }

    if (name === 'selectedUser') {
      setUser(value);
      setSelectError(false);
    }
  }

  const addNewTodo = () => {
    if (!(titleInput && (selectedUser !== '0'))) {
      setSelectError(true);
      setInputError(true);

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
    setUser('0');
    setSelectError(false);
    setInputError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          addNewTodo();
        }}
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
            {(!titleInput && inputError) && (
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

          {(selectedUser === '0' && selectError) && (
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
