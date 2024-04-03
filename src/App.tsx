import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos, Users } from './components/types';

export const App = () => {
  const [count, setCount] = useState<number>(2);
  const [userId, setUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todos[]>(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const [newTodo, setNewTodo] = useState({
    id: count,
    title: '',
    completed: false,
    userId: userId,
  });

  const addPost = (newPost: Todos) => {
    setTodos(currentPost => [...currentPost, newPost]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorTitle(false);

    const { name, value } = event.target;

    setNewTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorSelect(false);

    const selectedUserId = +event.target.value;

    setUserId(selectedUserId);

    setNewTodo(prevTodo => ({
      ...prevTodo,
      userId: selectedUserId,
    }));
  };

  const reset = () => {
    setUserId(0);
    setNewTodo(prevTodo => ({ ...prevTodo, title: '' }));
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setErrorTitle(!newTodo.title.trim());

    setErrorSelect(!userId);

    if (!newTodo.title.trim() || !userId) {
      return;
    }

    setCount(count + 1);

    addPost(newTodo);

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            onChange={handleChange}
            name="title"
            placeholder="Enter a title"
            value={newTodo.title}
            id="title"
            type="text"
            data-cy="titleInput"
          />

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            value={userId}
            onChange={handleSelect}
            data-cy="userSelect"
          >
            <option value="0" selected>
              Choose a user
            </option>
            {usersFromServer.map((user: Users) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
