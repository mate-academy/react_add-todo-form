import React, { useState } from 'react';
import { TodoList } from '../TodoList';
import usersFromServer from '../../api/users';
// import todosFromServer from '../../api/todos';
import { User } from '../../types/Users';

function getUserById(userId: number): User | null {
  return usersFromServer.find((user: { id: number; }) => user.id === userId)
    || null;
}

const initialUsers: User[] = usersFromServer.map(user => ({
  ...user,
  user: getUserById(user.id),
}));

export const TodoInfo: React.FC = () => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="title">Title: &nbsp;&nbsp;</label>
        <input
          placeholder="Enter a title"
          value={title}
          id="title"
          type="text"
          data-cy="titleInput"
          onChange={handleTitleChange}
        />
        <span className="error">Please enter a title</span>
      </div>
      {title}
      <TodoList
        users={initialUsers}
      />

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
