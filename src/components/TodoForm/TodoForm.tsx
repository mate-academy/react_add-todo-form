/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useState, FormEvent } from 'react';
import { User, Todo } from '../types';

interface TodoFormProps {
  users: User[];
  onAddTodo: (todo: Todo) => void;
  todos: Todo[];
}

export const TodoForm: React.FC<TodoFormProps> = ({ users, onAddTodo, todos }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({ title: '', user: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({ title: '', user: '' });

    if (!title.trim()) {
      setErrors(prev => ({ ...prev, title: 'Please enter a title' }));
    }

    if (!userId) {
      setErrors(prev => ({ ...prev, user: 'Please choose a user' }));
    }

    if (title.trim() && userId) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        title: title.trim(),
        userId: Number(userId),
        completed: false,
      };
      onAddTodo(newTodo);
      setTitle('');
      setUserId('');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''));
    setErrors(prev => ({ ...prev, title: '' }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title:</label>
        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter todo title"
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User:</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setErrors(prev => ({ ...prev, user: '' }));
          }}
        >
          <option value="" disabled>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {errors.user && <span className="error">{errors.user}</span>}
      </div>

      <button type="submit" data-cy="submitButton">Add</button>
    </form>
  );
};


