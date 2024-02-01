import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import { getUserById, getUsers } from './api';
import { User } from './types/User';

type Props = {
  onSubmit: (todo: Todo) => void;
  onReset?: () => void;
  todo?: Todo;
};

export const TodoForm = ({
  onSubmit,
  onReset = () => {},
  todo,
}: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);

    const timerId = setInterval(() => {
      getUsers().then(setUsers);
    }, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const [newTodoTitle, setNewTodoName] = useState(todo?.title || '');
  const [nameError, setNameError] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(todo?.userId || 0);
  const [userIdError, setUserIdError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!newTodoTitle) {
      setNameError('Please enter todo name');
    }

    if (!selectedUserId) {
      setUserIdError('Please select a user');
    }

    if (!newTodoTitle || !selectedUserId) {
      return;
    }

    if (todo && selectedUserId === todo.userId && newTodoTitle === todo.title) {
      onReset();

      return;
    }

    try {
      const user = await getUserById(selectedUserId);

      const newTodo: Todo = {
        id: todo?.id || 0,
        title: newTodoTitle,
        completed: todo?.completed || false,
        userId: selectedUserId,
        user,
      };

      onSubmit(newTodo);
      setNewTodoName('');
      setSelectedUserId(0);
    } catch (error) {
      // handle error
    } finally {
      // do something
    }
  }

  return (
    <form onSubmit={handleSubmit} onReset={onReset}>
      <div className="field">
        <input
          name="todoName"
          type="text"
          className={classNames({ 'with-error': nameError })}
          value={newTodoTitle}
          onChange={event => {
            setNewTodoName(event.target.value);
            setNameError('');
          }}
        />
        {nameError && (
          <span className="error">{nameError}</span>
        )}
      </div>

      <div className="field">
        <select
          className={classNames({ 'with-error': userIdError })}
          value={selectedUserId}
          onChange={event => {
            setSelectedUserId(+event.target.value);
            setUserIdError('');
          }}
        >
          <option value="0">Choose a user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userIdError && (
          <span className="error">{userIdError}</span>
        )}
      </div>

      <button type="submit">
        {todo ? 'Save' : 'Add'}
      </button>

      {/* eslint-disable-next-line react/button-has-type */}
      <button type="reset">Cancel</button>
    </form>
  );
};
