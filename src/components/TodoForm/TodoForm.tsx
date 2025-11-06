import React, { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  users: User[];
  todos: Todo[];
  onAdd: (todo: Todo) => void;
};

export const AddTodoForm: React.FC<Props> = ({ users, todos, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const selectedUser = users.find(u => u.id === +userId);
    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      userId: +userId,
      title: title.trim(),
      completed: false,
      user: selectedUser!,
    };

    onAdd(newTodo);

    setTitle('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          data-cy="titleInput"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
        />
      </label>
      {titleError && <p className="error">Please enter a title</p>}

      <label>
        User:
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            setUserError(false);
          }}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      {userError && <p className="error">Please choose a user</p>}

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
