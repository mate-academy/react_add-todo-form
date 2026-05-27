import { useState } from 'react';
import { Todo } from '../TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoFormProps {
  users: User[];
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasErrors = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasErrors = true;
    }

    if (userId === '') {
      setUserError('Please choose a user');
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const selectedUser = users.find(user => user.id === Number(userId));

    if (!selectedUser) {
      return;
    }

    onSubmit({
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    });

    setTitle('');
    setUserId('0');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todo-title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          id="todo-title"
          placeholder="Enter a title"
          onChange={event => {
            setTitle(event.target.value);
            setTitleError('');
          }}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user">User: </label>
        <select
          data-cy="userSelect"
          value={userId}
          id="todo-user"
          onChange={event => {
            setUserId(event.target.value);
            setUserError('');
          }}
        >
          <option value="0" disabled hidden>
            Choose a user
          </option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
