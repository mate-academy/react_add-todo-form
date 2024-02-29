import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    user: 0,
  });
  const [isFormFeeled, setIsFormFeeled] = useState({
    title: false,
    user: false,
  });
  const [initialTodos, setInitialTodos] = useState(todosFromServer);

  const handleUsertChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodo({ ...newTodo, user: +event.target.value });
    setIsFormFeeled({...isFormFeeled, user: false});
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, title: event.target.value });
    setIsFormFeeled({...isFormFeeled, title: false});
  };

  const todos = initialTodos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const createNewTodo = () => {
    const getLastId = Math.max(...todos.map(post => post.id));

    return {
      id: getLastId + 1,
      title: newTodo.title,
      completed: false,
      userId: newTodo.user,
    };
  };

  const sendTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsFormFeeled({ title: !newTodo.title, user: !newTodo.user });

    if (!newTodo.title || !newTodo.user) {
      return;
    }

    setInitialTodos([...initialTodos, createNewTodo()]);
    setNewTodo({ title: '', user: 0 });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={sendTodo}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={handleTitleChange}
          />
          {isFormFeeled.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={newTodo.user}
            onChange={handleUsertChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isFormFeeled.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
