import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { getUserById } from './servises/userBuild';
import { TodoList } from './components/TodoList';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  userId: getUserById(todo.userId)?.id as NonNullable<number>,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState(false);
  const [userId, setUserId] = useState(0);
  const [errorsSelect, setErrorsSelect] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosList);

  const hadlleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrors(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorsSelect(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrors(!title);
    setErrorsSelect(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&nbsp;
          <input
            value={title}
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            onChange={hadlleTitleChange}
          />
          {errors && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={userId}
          >
            <option value={0} selected>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errorsSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
