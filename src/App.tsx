
import './App.scss';
import React, { useState } from 'react';


import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}


interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
  user: User,
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId , setUserId] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [completed, setCompleted] = useState(false);
  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
  };

  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);
  const users = usersFromServer;
  const foundUserCorrected = users.find(user => user.id === parseInt(userId, 10));

  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError('');
    setUserError('');

    let hasError = false;
    if (!title) {
      setTitleError('Please enter a title');
      hasError = true;
    }
    if (!userId) {
      setUserError('Please enter a user');
      hasError = true;
    } else if (!foundUserCorrected) {
      setUserError('Selected user not found');
      hasError = true;
    }

    if (title && userId) {
      const newTodo = {
      id: maxId + 1,
      title: title,
      userId: Number(userId),
      completed: false,
      user: foundUserCorrected as User,
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTitle('');
      setUserId('');
      setCompleted(false);
    }
  }

const isFulled = title.trim() !== '' && userId !== '';


  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit} >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}

        </div>

        <div className="field">
          <select data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setUserError('');
            }}
          >
            <option value="">
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
           ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={!isFulled}
          >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
