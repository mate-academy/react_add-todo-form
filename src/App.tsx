import { useState, ChangeEvent, FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoUser, setTodoUser] = useState<string>('0');
  const [todos, setTodos] = useState(todosFromServer);
  const [userError, setUserError] = useState<boolean>(false);
  const [titleError, setTitleError] = useState<boolean>(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTodoUser(event.target.value);
    setUserError(false);
  };

  const handleCreateTodo = (event: FormEvent) => {
    if (todoUser === '0') {
      setUserError(true);
    }

    if (todoTitle.length === 0) {
      setTitleError(true);
    }

    event.preventDefault();
    const newId
      = todos.reduce(
        (acc, curr) => (curr.id > acc.id ? curr : acc), todos[0],
      ).id + 1;

    const userObject = usersFromServer.find((user) => user.name === todoUser);

    if (!userObject) {
      return;
    }

    const newTodo = {
      id: newId,
      title: todoTitle,
      completed: false,
      userId: userObject.id,
    };

    if (todoTitle.length && todoUser) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoTitle('');
      setTodoUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
            required
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="title">User: </label>
          <select
            data-cy="userSelect"
            value={todoUser}
            onChange={handleUserChange}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleCreateTodo}>
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
