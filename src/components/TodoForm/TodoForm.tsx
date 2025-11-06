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

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!trimmedTitle || !userId) {
      return;
    }

    const selectedUser = users.find(user => user.id === +userId);
    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

    const newTodo: Todo = {
      id: newId,
      userId: +userId,
      title: trimmedTitle,
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
          onChange={event => {
            setTitle(event.target.value);
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
          onChange={event => {
            setUserId(event.target.value);
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
