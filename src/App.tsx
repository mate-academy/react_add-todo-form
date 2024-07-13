import React, { useState, ChangeEvent, FormEvent } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo, NewTodo } from './types/types';
import './App.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [newTodo, setNewTodo] = useState<NewTodo>({ title: '', userId: '0' });
  const [errors, setErrors] = useState<NewTodo>({ title: '', userId: '' });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNewTodo({
      ...newTodo,
      [name]: value,
    });

    if (value.trim() !== '') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const resetForm = () => {
    setNewTodo({ title: '', userId: '0' });
    setErrors({ title: '', userId: '' });
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, userId } = newTodo;

    let formIsValid = true;
    const newErrors: NewTodo = { title: '', userId: '' };

    if (title.trim() === '') {
      newErrors.title = 'Please enter a title';
      formIsValid = false;
    }

    if (userId === '' || userId === '0') {
      newErrors.userId = 'Please choose a user';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);

      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodoItem: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: parseInt(userId, 10),
    };

    setTodos([...todos, newTodoItem]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add a Todo Form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
            data-cy="titleInput"
            placeholder="Enter title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="userId"
            value={newTodo.userId}
            onChange={handleChange}
            data-cy="userSelect"
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
          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
