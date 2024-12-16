import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import React, { useState } from 'react';
import { Todo } from './components/Types/Todo';
import { User } from './components/Types/User';

const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.id),

}));

const getNewTodoId = (todos: Todo[]): number => (
  todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1
);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [formData, setFormData] = useState({ title: '', userId: 0 });
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'userId' ? +value : value,
    });
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      title: !formData.title.trim(),
      userId: !formData.userId,
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.userId;
  };

  const createNewTodo = (): Todo => ({
    id: getNewTodoId(todos),
    title: formData.title.trim(),
    completed: false,
    userId: formData.userId,
    user: getUserById(formData.userId),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setTodos(prevTodos => [...prevTodos, createNewTodo()]);
    setFormData({ title: '', userId: 0 });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter a title"
                data-cy="titleInput"
                onChange={handleInputChange}
              />
            </label>
            {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
              User:
              <select
                name="userId"
                data-cy="userSelect"
                value={formData.userId}
                onChange={handleInputChange}
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
            </label>

            {errors.userId && (
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
