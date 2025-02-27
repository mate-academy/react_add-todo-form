import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { useState } from 'react';
import users from './api/users';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  user: getUserById(todo.userId),
  ...todo,
}));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserId, setNewTodoUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [newTodoId, setNewTodoId] = useState(
    Math.max(...todos.map(todo => todo.id)) + 1,
  );

  const newTodo = {
    user: users.find(user => user.id === newTodoUserId) || null,
    id: newTodoId,
    title: newTodoTitle,
    completed: false,
    userId: newTodoUserId,
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (newTodo.title === '' || newTodo.userId === 0) {
      if (newTodo.title === '') {
        setTitleError(true);
      }

      if (newTodo.userId === 0) {
        setUserError(true);
      }

      return;
    }

    setNewTodoId(newTodoId + 1);
    setCurrentTodos([...currentTodos, newTodo]);
    setUserError(false);
    setTitleError(false);
    setNewTodoUserId(0);
    setNewTodoTitle('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={e => handleSubmit(e)}>
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            value={newTodoTitle}
            placeholder={'Enter a title'}
            onChange={e => {
              setNewTodoTitle(e.target.value);
              if (e.target.value !== '') {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={newTodoUserId}
            onChange={e => {
              setNewTodoUserId(+e.target.value);
              if (+e.currentTarget.value !== 0) {
                setUserError(false);
              }
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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

      <TodoList todos={currentTodos} />
    </div>
  );
};
