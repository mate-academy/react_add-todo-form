import React, { useState } from 'react';
import todos, { Todo, User } from '../api/todos';

interface TodoFormProps {
  users: User[];
  addTodo: (newTodo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ users, addTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a title');

      return;
    }

    if (!userId) {
      setError('Please choose a user');

      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      userId: userId as number,
      completed: false,
      user: null,
    };

    addTodo(newTodo);
    setTitle('');
    setUserId('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        placeholder="Enter todo title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        data-cy="titleInput"
      />
      <select
        value={userId}
        onChange={e => setUserId(Number(e.target.value))}
        data-cy="userSelect"
      >
        <option value="">Choose a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default TodoForm;
