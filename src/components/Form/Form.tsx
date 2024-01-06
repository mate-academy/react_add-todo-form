import React, { useState } from 'react';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../services/user';

import usersFromServer from '../../api/users';

type Props = {
  todoList: Todo[];
  onSubmit: (todo: Todo) => void;
};

const getNewId = (todos: Todo[]):number => {
  return Math.max(...todos.map(el => el.id));
};

export const Form: React.FC<Props> = ({ todoList, onSubmit }) => {
  const [user, setUser] = useState(0);
  const [isUser, setIsUser] = useState(true);

  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsUser(!!user);
    setIsTitle(!!title);

    if (!user || !title) {
      return;
    }

    const newTodo = {
      id: getNewId(todoList) + 1,
      title,
      completed: false,
      userId: user,
      user: getUserById(+user),
    };

    onSubmit(newTodo);

    setTitle('');
    setUser(0);
  };

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setIsUser(true);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">User</label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          name="title"
          id="title"
          placeholder="Enter title"
          onChange={handleTitleChange}
        />

        {!isTitle && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User</label>
        <select
          id="user"
          data-cy="userSelect"
          name="user"
          value={user}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>

          {usersFromServer.map((el: User) => {
            return (
              <option value={el.id} key={el.id}>
                {el.name}
              </option>
            );
          })}
        </select>

        {!isUser && <span className="error">Please choose a user</span>}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
