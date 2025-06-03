import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [todo, setTodo] = useState(todosWithUser);
  const [isFormTried, setIsFormTried] = useState(false);

  const trimTitle = title.trim();
  const maxId = Math.max(...todo.map(todoItem => todoItem.id), 0);
  const newId = maxId + 1;
  const userId = Number(user);

  const reset = () => {
    setTitle('');
    setUser(0);
    setIsFormTried(false);
  };

  const isValid = trimTitle !== '' && user !== 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormTried(true);

    if (!isValid) {
      return;
    }

    const newTodo = {
      id: newId,
      title: trimTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodo(todos => [...todos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {isFormTried && trimTitle === '' && (
            <span className="error"> Please enter a title</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(users => (
              <option value={users.id} key={users.id}>
                {users.name}
              </option>
            ))}
          </select>
          {isFormTried && user === 0 && (
            <span className="error"> Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todo} />
    </div>
  );
};
