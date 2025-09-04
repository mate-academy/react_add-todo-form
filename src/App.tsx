import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [newTodos, setNewTodos] = useState(todos);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');

      return;
    }

    if (!user) {
      setUserError('Please choose a user');

      return;
    }

    const maxId = Math.max(...newTodos.map(t => t.id));
    const selectedUser = usersFromServer.find(u => u.id === Number(user));

    if (!selectedUser) {
      setUserError('Please choose a user');

      return;
    }

    const newTodo = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setNewTodos([...newTodos, newTodo]);

    setTitle('');
    setTitleError('');
    setUser('');
    setUserError('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setUserError('');
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map(u => (
              <option value={u.id} key={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
