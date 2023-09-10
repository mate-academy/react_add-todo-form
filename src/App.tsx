/* eslint-disable max-len */
import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/TodoList/TodoList';

export const App = () => {
  const [todosArr, setTodosArr] = useState(todosFromServer);
  const [formData, setFormData] = useState({ title: '', userSelect: '0' });
  const [errors, setErrors] = useState({ title: false, userSelect: false });

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSumbit(event: React.FormEvent) {
    event.preventDefault();

    const titleError = !formData.title;
    const userSelectError = formData.userSelect === '0';

    if (titleError || userSelectError) {
      setErrors({ title: titleError, userSelect: userSelectError });

      return;
    }

    setTodosArr(prevTodos => {
      const nextId = Math.max(...prevTodos.map(todo => todo.id)) + 1;

      const newTodo = {
        id: nextId,
        title: formData.title,
        userId: Number(formData.userSelect),
        completed: false,
      };

      return [...prevTodos, newTodo];
    });

    setFormData({ title: '', userSelect: '0' });
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSumbit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            name="title"
            placeholder="Enter a title"
            id="titleInput"
            data-cy="titleInput"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error"> Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="userSelect"
            value={formData.userSelect}
            data-cy="userSelect"
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.userSelect && <span className="error"> Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosArr} users={usersFromServer} />
    </div>
  );
};
