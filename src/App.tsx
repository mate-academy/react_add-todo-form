import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ChangeEvent, FormEvent, useState } from 'react';
import React from 'react';
import { TodoList } from './components/TodoList';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const App: React.FC = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => {
    const foundUser = usersFromServer.find(user => user.id === todo.userId)!;

    return {
      ...todo,
      user: foundUser,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (title.trim() === '') {
      setTitleError(true);
      isValid = false;
    }

    if (userId === 0) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newUser = usersFromServer.find(user => user.id === userId)!;

    const newTodo: Todo = {
      id: newId,
      title,
      userId,
      completed: false,
      user: newUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (changeEvent: ChangeEvent<HTMLInputElement>) => {
    const value = changeEvent.target.value.replace(
      /[^a-zA-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9\s]/g,
      '',
    );

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (changeEvent: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(changeEvent.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              placeholder="Enter todo title"
              value={title}
              onChange={handleTitleChange}
              data-cy="titleInput"
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              value={userId}
              onChange={handleUserChange}
              data-cy="userSelect"
            >
              <option value={0} disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
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
