import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  onAdd: (newTodo: Todo) => void;
  todos: Todo[];
  users: User[];
}

export const TodoForm: React.FC<Props> = ({ onAdd, todos, users }) => {
  const defaultFields = {
    id: Math.max(...todos.map(todo => todo.id)) + 1,
    title: '',
    userId: 0,
    completed: false,
    user: null,
  };

  const [todo, setTodo] = useState<{
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user: User | null;
  }>(defaultFields);
  const [error, setError] = useState(false);
  const { title, userId } = todo;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setTodo(prev => ({
      ...prev,
      [name]: name === 'title' ? value : +value,
    }));

    if (name === 'userId') {
      const user = users.find(u => u.id === +value);

      setTodo(prev => ({
        ...prev,
        user: user || null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || userId === 0) {
      setError(true);

      return;
    }

    onAdd(todo);
    setTodo(defaultFields);
    setError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          id="title"
          placeholder="Enter a title"
          value={title}
          type="text"
          data-cy="titleInput"
          onChange={onChange}
        />
        {!title.trim() && error && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          name="userId"
          id="user"
          data-cy="userSelect"
          onChange={onChange}
        >
          <option value="0" disabled selected={todo.userId === 0}>
            Choose a user
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {userId === 0 && error && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
