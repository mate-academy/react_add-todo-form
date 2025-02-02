import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ChangeEvent, FormEvent, useState } from 'react';

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [text, setText] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);

  const handleUserChange = event => {
    setSelectedUserId(Number(event.target.value));
    if (userError) {
      setUserError(false);
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!text) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    if (text && selectedUserId) {
      const newTodo = {
        id: newTodos.length + 1,
        title: text,
        completed: false,
        userId: selectedUserId,
        user: usersFromServer.find(user => user.id === selectedUserId),
      };

      setNewTodos([...newTodos, newTodo]);
      setText('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder='Enter a title'
            value={text}
            onChange={handleTitleChange}
            type="text"
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user?.name}
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
