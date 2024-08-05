import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const todosFromServerWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServerWithUsers);
  const [todo, setTodo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [error, setError] = useState('');

  const isFormValid = () => {
    return todo.title.trim() !== '' && todo.userId !== 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: name === 'userId' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      setError('Please fill in all fields');

      return;
    }

    const newTodo = {
      ...todo,
      id: getNewPostId(todos),
      user: getUserById(todo.userId),
    };

    setTodos([...todos, newTodo]);
    setTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
    setError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
          {!todo.title.trim() && error && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={todo.userId}
            onChange={handleChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {todo.userId === 0 && error && (
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
