import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [userIsNotSelected, setUserIsNotSelected] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  function generateNewTodoId() {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  function reset() {
    setTitle('');
    setUserId('0');
    setIsTitleEmpty(false);
    setUserIsNotSelected(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleEmpty(!title.trim());
    setUserIsNotSelected(userId === '0');

    if (!title.trim() || userId === '0') {
      return;
    }

    const newTodo: Todo = {
      id: generateNewTodoId(),
      title,
      completed: false,
      userId: +userId,
    };

    setTodos(prev => [...prev, newTodo]);

    reset();
  };

  function getUserById(id: number) {
    return usersFromServer.find(user => user.id === id) || usersFromServer[0];
  }

  const prepareTodos = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(() => event.target.value);
              setIsTitleEmpty(false);
            }}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            onChange={event => {
              setUserId(event.target.value);
              setUserIsNotSelected(false);
            }}
            value={String(userId)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={`${user.id}`} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIsNotSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={prepareTodos} />
    </div>
  );
};
