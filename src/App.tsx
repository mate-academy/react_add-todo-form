import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User, TodoWithUser } from './types';

const getUserById = (userId: number, users: User[]) => (
  users.find(user => user.id === userId) || null
);

const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  const addNewTodo = (todoTitle: string, todoUserId: number) => {
    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId, usersFromServer),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    if (!hasUserIdError && !hasTitleError) {
      addNewTodo(title, userId);
      setTitle('');
      setUserId(0);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleInput}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
