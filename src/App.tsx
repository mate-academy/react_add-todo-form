import './App.scss';
import { ChangeEvent, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userName, setUserName] = useState(0);
  const [title, setTitle] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isErrorTitle, setErrorTitle] = useState(false);
  const [isErrorUserName, setErrorUserName] = useState(false);

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserName(Number(event.target.value));
    setErrorUserName(false);
  };

  const handleTitle = ((event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  });

  const resetForm = () => {
    setUserName(0);
    setTitle('');
  };

  const newTodoId = Math.max(...visibleTodos.map(todo => todo.id));

  const handleFormSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorTitle(!title);
    setErrorUserName(!userName);

    const newTodo: Todo = {
      id: newTodoId + 1,
      title,
      completed: false,
      userId: userName,
      user: getUser(userName),
    };

    if (title && userName) {
      setTodos(currentTodo => [
        ...currentTodo,
        newTodo,
      ]);

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            id="#todoTitle"
            onChange={handleTitle}
          />
          {isErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="#userSelect"
            value={userName}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {isErrorUserName
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
