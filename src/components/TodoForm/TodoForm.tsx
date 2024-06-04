import React, { useState } from 'react';
import cn from 'classnames';
import { getUserById } from '../../services/userService';
import { TodoProps } from '../../types/TodoProps';
import { UserProps } from '../../types/UserProps';

export const TodoForm = ({
  users,
  onAdd,
}: {
  users: UserProps[];
  onAdd: (newTodo: TodoProps) => void;
}) => {
  const [userId, setUserId] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<boolean>(false);

  const [done, setDone] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setSelectedTitle(!title.trim());
    setSelectedUser(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const reset = () => {
      setTitle('');
      setUserId(0);
      setCount(count + 1);
    };

    onAdd({
      id: +count,
      title,
      completed: done,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleAdd}>
      <div className="field">
        <label className="label" htmlFor="input">
          ToDo
        </label>
        <div className="control ">
          <input
            id="input"
            className={cn('input', {
              'is-danger': selectedTitle,
            })}
            type="text"
            placeholder="TOdo"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setSelectedTitle(false);
            }}
          />
        </div>
        {selectedTitle && (
          <p className="help is-danger">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="selection">
          User
        </label>
        <div className="control">
          <div
            className={cn('select', {
              'is-danger': selectedUser,
            })}
          >
            <select
              id="selection"
              value={userId}
              required
              onChange={event => {
                setUserId(+event.target.value);
                setSelectedUser(false);
              }}
            >
              <>
                <option value={0} disabled>
                  Select user
                </option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </>
            </select>
          </div>
          {selectedUser && (
            <p className="help is-danger">Please choose a user</p>
          )}
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              checked={done}
              onChange={event => {
                setDone(event.target.checked);
              }}
            />{' '}
            DONE{' '}
          </label>
        </div>
      </div>

      <div className="control">
        <button className="button is-link" type="submit" data-cy="submitButton">
          Add
        </button>
      </div>
    </form>
  );
};
