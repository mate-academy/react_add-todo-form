import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import getMaxTodosId from './services/todosServices';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [todoTitleError, setTodoTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const resetTodoForm = () => {
    setTitle('');
    setTodoTitleError(false);
    setUserId(0);
    setUserIdError(false);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserIdError(userId === 0);
    setTodoTitleError(title === '');

    if (userId !== 0 && title !== '') {
      const newTodoId = getMaxTodosId(todos);
      const newTodo = {
        id: newTodoId + 1,
        completed: false,
        title,
        userId,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetTodoForm();
    }
  };

  const handleUserIdChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserIdError(false);
  };

  const todoTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTodoTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onFormSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title:</label>
          <input
            id="todo-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={todoTitleHandler}
          />
          {todoTitleError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user-id">User:</label>
          <select
            id="todo-user-id"
            data-cy="userSelect"
            onChange={handleUserIdChange}
            value={userId}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map((user) => {
              return (
                <option value={user.id} key={user.id}>{user.name}</option>
              );
            })}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
