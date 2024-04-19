import React, { useState } from 'react';
import './App.scss';
import { Todo } from './api/todos';
import usersFromServer from './api/users';
import todosfromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const normalizedData = todosfromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [listOfToDos, setListOfToDos] = useState<Todo[]>(normalizedData);
  const initialTodo: Todo = {
    id: Math.max(...listOfToDos.map(todo => todo.id)) + 1,
    title: '',
    userId: 0,
    completed: false,
    user: {
      id: 0,
      username: '',
      name: '',
      email: '',
    },
  };

  const [todo, setToDo] = useState(initialTodo);
  const [showError, setShowError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setToDo(prevToDo => ({
      ...prevToDo,
      [e.target.name]:
        e.target.name === 'title' ? e.target.value : +e.target.value,
    }));
    if (e.target.name === 'userId') {
      const user = usersFromServer.find(
        targetUser => targetUser.id === +e.target.value,
      );

      setToDo(prevToDo => ({
        ...prevToDo,
        user: user || initialTodo.user,
      }));
    }
  };

  const resetToDo = () => {
    setToDo({ ...initialTodo, id: initialTodo.id + 1 });
    setShowError(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title.trim() || todo.userId === 0) {
      setShowError(true);

      return;
    }

    setListOfToDos(prevList => [...prevList, todo]);
    resetToDo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            id="title"
            placeholder="Enter a title"
            value={todo.title}
            type="text"
            data-cy="titleInput"
            onChange={handleChange}
          />
          {!todo.title.trim() && showError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="userId"
            id="user"
            data-cy="userSelect"
            onChange={handleChange}
          >
            <option value="0" disabled selected={todo.userId === 0}>
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>

          {todo.userId === 0 && showError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={listOfToDos} />
    </div>
  );
};
