import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { Todo } from './type/type';

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

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const maxTodoId = Math.max(...newTodos.map(todo => todo.id));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
    setUserError('');
  };

  const handleTitleError = () => {
    if (!title) {
      setTitleError('Please enter a title');
    }
  };

  const handleUserError = () => {
    if (!selectedUserId) {
      setUserError('Please choose a user');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleTitleError();
    handleUserError();

    if (!title || !selectedUserId) {
      return;
    }

    setNewTodos([
      ...newTodos,
      {
        id: maxTodoId + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: usersFromServer.find(user => user.id === selectedUserId),
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
