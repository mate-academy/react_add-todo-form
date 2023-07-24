import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList';

export const App = () => {
  function getUserById(userId: number): User | undefined {
    return usersFromServer.find((user) => user.id === userId);
  }

  const todosWithUser = todosFromServer.map((todo) => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const [title, setTitle] = useState('');

  const [user, setUser] = useState(usersFromServer[0]);
  const [userName, setUserName] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validTitle = title.trim();
    const validUserName = userName !== '0';

    if (!validTitle) {
      setTitleError(true);
    }

    if (!validUserName) {
      setUserError(true);
    }

    if (validTitle && validUserName) {
      const largestId = Math.max(...todos.map((todo) => todo.id));
      const newTodoId = largestId + 1;

      const newTodo: Todo = {
        id: newTodoId,
        title,
        completed: false,
        userId: user.id,
        user,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserName('0');
      setUser(usersFromServer[0]);
      setTitleError(false);
      setUserError(false);
    }
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const userPick = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserName = event.target.value;

    setUserName(selectedUserName);
    const newUser = usersFromServer
      .find(item => item.name === selectedUserName);

    if (newUser) {
      setUser(newUser);
    }

    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => formSubmit(event)}
      >
        <div className="field">
          <label htmlFor="" className="field__title">
            Title:
            <input
              value={title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={titleChange}
            />
            {titleError
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label className="field__title">
            User:
            <select
              data-cy="userSelect"
              onChange={userPick}
              value={userName}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((singleUser) => (
                <option
                  key={singleUser.id}
                  value={singleUser.name}
                >
                  {singleUser.name}
                </option>
              ))}
            </select>
            {userError && <span className="error">Please choose a user</span>}
          </label>

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
