import { useState } from 'react';
import React from 'react';
import { User } from '../../types/User';

type NewTodoData = {
  title: string;
  userId: number;
};

type Props = {
  onAdd: (data: NewTodoData) => void;
  users: User[];
};

export const NewTodo: React.FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid = title.trim() && userId;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isValid) {
      return;
    }

    onAdd({
      title: title.trim(),
      userId: +userId,
    });

    setTitle('');
    setUserId('');
    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="NewTodo">
      <div className="field">
        <label htmlFor="title">Title:&nbsp;</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter a title"
          data-cy="titleInput"
        />
        {isSubmitted && !title.trim() && (
          <span className="error">&nbsp;Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User:&nbsp;</label>
        <select
          id="user"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          data-cy="userSelect"
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {isSubmitted && !userId && (
          <span className="error">&nbsp;Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add Todo
      </button>
    </form>
  );
};
