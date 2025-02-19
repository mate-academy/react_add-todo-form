import React, { useState } from 'react';
import { Todo, User } from '../../types/types';
import { getUserById } from '../../helpers/helpers';
import users from '../../api/users';

interface Props {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
}

export const NewTodo: React.FC<Props> = ({ onAdd, todos }) => {
  const [todo, setTodo] = useState<Omit<Todo, 'id' | 'completed' | 'user'>>({
    title: '',
    userId: 0,
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [errors, setErrors] = useState({ title: '', user: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTodo({ ...todo, title: sanitizedTitle });
    if (submitted) {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value, 10);
    const user = getUserById(userId);

    setSelectedUser(user);
    setTodo({ ...todo, userId });
    if (submitted) {
      setErrors({ ...errors, user: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = {
      title: todo.title ? '' : 'Please enter a title',
      user: selectedUser ? '' : 'Please choose a user',
    };

    setErrors(newErrors);

    if (!todo.title || !selectedUser) {
      return; // Stop execution if there are validation errors
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: todo.title,
      completed: false,
      userId: todo.userId,
      user: selectedUser,
    };

    onAdd(newTodo);
    setTodo({ title: '', userId: 0 });
    setSelectedUser(null);
    setErrors({ title: '', user: '' });
    setSubmitted(false);
  };

  return (
    <div>
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={todo.title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {submitted && errors.title && (
            <span className="error">{errors.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={todo.userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {submitted && errors.user && (
            <span className="error">{errors.user}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
