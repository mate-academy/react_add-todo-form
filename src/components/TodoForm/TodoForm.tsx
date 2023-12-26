import React, { useState } from 'react';
import './TodoForm.scss';
import usersFromServer from '../../api/users';
import { Todo, User } from '../../types/types';
import { getUserByTodo } from '../../services/posts';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [isTitleErrorShow, setIsTitleErrorShow] = useState(false);

  const [userId, setUserId] = useState(0);
  const [isUserErrorShow, setIsUserErrorShow] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setIsTitleErrorShow(false);
  }

  function handleUserChange(event: { target: { value: string | number; }; }) {
    setUserId(+event.target.value);
    setIsUserErrorShow(false);
  }

  function reset() {
    setTitle('');
    setUserId(0);
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();

    setIsTitleErrorShow(!title.trim());
    setIsUserErrorShow(userId === 0);

    if (!title.trim() || userId === 0) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserByTodo(userId),
    });

    reset();
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">Title: </label>
        <input
          id="todo-title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />

        {isTitleErrorShow
          && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="post-user">User: </label>
        <select
          id="post-user"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map((option: User) => (
            <option
              value={option.id}
              key={option.id}
            >
              {option.name}
            </option>
          ))}
        </select>

        {isUserErrorShow && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
