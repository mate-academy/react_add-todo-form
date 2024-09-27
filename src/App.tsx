import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import './App.scss';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxTodoId = newTodos.reduce(
    (max, todo) => (todo.id < max ? max : todo.id),
    0,
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    newValue = newValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    setTitle(newValue);
    setTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    setUserError(false);
  };

  const handleTitleError = () => {
    if (!title) {
      setTitleError(true);
    }
  };

  const handleUserError = () => {
    if (!selectedUserId) {
      setUserError(true);
    }
  };

  const validate = () => {
    handleTitleError();
    handleUserError();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validate();

    if (titleError || userError) {
      return;
    }

    setNewTodos([
      ...newTodos,
      {
        id: maxTodoId + 1,
        title,
        completed: false,
        userId: selectedUserId,
      },
    ]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
