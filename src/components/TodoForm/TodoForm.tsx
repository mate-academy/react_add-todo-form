import React, { useState } from 'react';
import './TodoForm.scss';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAdd: (newTodo: Todo) => void;
  currentTodos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ users, onAdd, currentTodos }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title.trim());
    setSelectError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const selected = users.find(user => user.id === userId);

    if (!selected) {
      return;
    }

    const newTodo: Todo = {
      id:
        currentTodos.length > 0
          ? Math.max(...currentTodos.map(todo => todo.id)) + 1
          : 1,
      title,
      completed: false,
      userId: userId,
      user: selected,
    };

    onAdd(newTodo);
    setTitle('');
    setUserId(0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="title">
          Title:{' '}
        </label>

        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleInputChange}
        />

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="select">
          User:{' '}
        </label>

        <select
          id="select"
          data-cy="userSelect"
          value={userId}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {selectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
