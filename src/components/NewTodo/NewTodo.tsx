import React, { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import todos from '../../api/todos';

type Props = {
  users: User[],
  onSubmit: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserChosen, setIsUserChosen] = useState(true);
  const maxId = Math.max(...todos.map(todo => todo.id));

  const handleAddOfTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setIsTitleEmpty(true);
    }

    if (!selectedUserId) {
      setIsUserChosen(false);
    }

    if (!title || !selectedUserId) {
      return;
    }

    onSubmit({
      title,
      id: maxId + 1,
      completed: false,
      userId: selectedUserId,
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleAddOfTodo}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setIsTitleEmpty(false);
          }}

        />
        {isTitleEmpty && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="selectUser">User: </label>
        <select
          data-cy="userSelect"
          id="selectUser"
          value={selectedUserId}
          onChange={event => {
            setSelectedUserId(+event.target.value);
            setIsUserChosen(true);
          }}
        >
          <option
            value={0}
            disabled
            selected
          >
            Choose a user
          </option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {!isUserChosen && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
