import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
// import { event } from 'cypress/types/jquery';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const handleTitleChange = (value: string) => {
    const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g, '');

    setTitle(filteredValue);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (value: string) => {
    setUserId(value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isFormValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isFormValid = false;
    }

    if (!userId) {
      setUserError(true);
      isFormValid = false;
    }

    if (isFormValid) {
      const maxId = todos.reduce(
        (max, todo) => (todo.id > max ? todo.id : max),
        0,
      );
      const newTodoId = maxId + 1;

      const foundUser = usersFromServer.find(
        user => user.id === Number(userId),
      );

      if (foundUser) {
        const newTodo: Todo = {
          id: newTodoId,
          title,
          userId: Number(userId),
          completed: false,
          user: foundUser,
        };

        setTodos([...todos, newTodo]);
        setTitle('');
        setUserId('');
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserChange(event.target.value)}
          >
            <option value="">Choose a user</option>
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

      <TodoList todos={todos} />
    </div>
  );
};
