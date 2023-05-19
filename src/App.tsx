import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from '../types/Todo';
import { TodoList } from './components/TodoList';

const getTodos = (): Todo[] => {
  return todosFromServer.map(todo => {
    const todoExecutor = usersFromServer
      .find(user => user.id === todo.userId) || null;

    const { title, completed, id } = todo;

    return {
      title,
      completed,
      id,
      user: todoExecutor,
    };
  });
};

export const App = () => {
  const newTodoDefault = {
    title: '',
    completed: false,
    id: -1,
    user: null,
  };
  const [todos, setTodos] = useState(getTodos());
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [newTodo, setNewTodo] = useState<Todo>(newTodoDefault);

  let currentId: number = Math.max(...todos.map(todo => todo.id)) + 1;

  const getTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  };

  const getUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = usersFromServer
      .find(user => user.id === +event.target.value) || null;

    setNewTodo({
      ...newTodo,
      user: selectedUser,
    });
  };

  const submitNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAddPressed(true);

    if (newTodo.title && newTodo.user) {
      newTodo.id = currentId;
      currentId += 1;
      setTodos([...todos, newTodo]);
      setIsAddPressed(false);
      setNewTodo(newTodoDefault);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitNewTodo}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={getTitle}
          />
          {!newTodo.title && isAddPressed
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={newTodo.user?.id ? newTodo.user.id : '0'}
            onChange={getUser}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return <option value={id} key={id}>{name}</option>;
            })}
          </select>

          {!newTodo.user && isAddPressed
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
