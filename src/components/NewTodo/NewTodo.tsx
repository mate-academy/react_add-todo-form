import React, { useState } from 'react';
import { Todo } from '../../App';
import { User } from '../../App';

interface Props {
  users: User[];
  onAdd: (todo: Todo) => void;
  maxId: number;
}

export const NewTodo: React.FC<Props> = ({ users, onAdd, maxId }) => {
  const [count, setCount] = useState(0);
  const [newTodo, setNewTodo] = useState({
    id: maxId + 1,
    title: '',
    userId: 0,
    completed: false,
    user: undefined,
  });
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const isFormValid = () => {
    return newTodo.title.trim() !== '' && newTodo.userId !== 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    newTodo.title = newTodo.title.trim();
    e.preventDefault();
    if (!isFormValid()) {
      if (newTodo.title === '') {
        setShowTitleError(true);
      } else {
        setShowTitleError(false);
      }

      if (newTodo.userId === 0) {
        setShowUserError(true);
      } else {
        setShowUserError(false);
      }

      return;
    } else {
      onAdd(newTodo);
      setCount(count + 1);
      setNewTodo({
        id: newTodo.id + 1,
        title: '',
        userId: 0,
        completed: false,
        user: undefined,
      });
      setShowTitleError(false);
      setShowUserError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" key={count}>
      <div className="field">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a value"
          value={newTodo.title}
          onChange={e => {
            setNewTodo({ ...newTodo, title: e.target.value });
            setShowTitleError(false);
          }}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User:</label>
        <select
          id="user"
          data-cy="userSelect"
          defaultValue="0"
          onChange={e => {
            setNewTodo({ ...newTodo, userId: Number(e.target.value) });
            setShowUserError(false);
          }}
        >
          <option key="0" value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
        Add
      </button>
    </form>
  );
};
