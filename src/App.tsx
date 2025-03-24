import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import React from 'react';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoInfoProps } from './types/types';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  // State for todos
  const [todos, setTodos] = useState<TodoInfoProps[]>(
    todosFromServer
      .filter(todo => usersFromServer.some(user => user.id === todo.userId)) // ✅ Keep only todos with existing users
      .map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId)!, // `!` asserts that user exists
      })),
  );

  // State
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState('0');
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isUserInvalid, setIsUserInvalid] = useState(false);

  // Event handler
  const onChange = (newValue: string) => {
    setTitle(newValue);
  };

  const onChangeUser = (newValue: string) => {
    setSelectUser(newValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate title
    setIsTitleInvalid(title.trim() === '');
    setIsUserInvalid(selectUser === '0');

    if (title.trim() === '' || selectUser === '0') {
      return;
    }

    const user = usersFromServer.find(u => u.id === Number(selectUser));

    if (!user) {
      return;
    }

    // Create new todo
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      completed: false,
      userId: user.id,
      user,
    };

    // Update state with new todo
    setTodos(prevTodos => [...prevTodos, newTodo]);

    // Reset form
    setTitle('');
    setSelectUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        data-cy="userInfoForm"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              onChange(event.target.value);
              setIsTitleInvalid(false);
            }}
          />
          {isTitleInvalid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={event => {
              onChangeUser(event.target.value);
              setIsUserInvalid(false);
            }}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserInvalid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
