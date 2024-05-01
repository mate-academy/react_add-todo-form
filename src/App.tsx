import './App.scss';

import { useState } from 'react';
import { Todo } from './Types/Todo';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getUserById } from './utils/getUserById';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }));
  });

  const [formData, setFormData] = useState({
    title: '',
    userId: 0,
    isValidTitle: true,
    isValidUser: true,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setFormData(prevState => ({
      ...prevState,
      title: cleanedTitle,
      isValidTitle: cleanedTitle !== '',
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = +e.target.value;

    setFormData(prevState => ({
      ...prevState,
      userId: selectedUserId,
      isValidUser: selectedUserId !== 0,
    }));
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, userId } = formData;

    if (title === '') {
      setFormData(prevState => ({ ...prevState, isValidTitle: false }));
    }

    if (userId === 0) {
      setFormData(prevState => ({ ...prevState, isValidUser: false }));
    }

    if (title === '' || userId === 0) {
      return;
    }

    const newTodo = {
      title,
      userId,
      completed: false,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);

    setFormData({
      title: '',
      userId: 0,
      isValidTitle: true,
      isValidUser: true,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            onChange={handleTitleChange}
            type="text"
            data-cy="titleInput"
            value={formData.title}
            placeholder="enter a title"
          />
          {!formData.isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            onChange={handleUserChange}
            value={formData.userId}
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
          {!formData.isValidUser && (
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
