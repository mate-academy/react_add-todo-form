import React, { useState } from 'react';
import { TodoProps } from '../../todoProps';
import { UserProps } from '../../userProps';

interface Props {
  addTodo: (todo: TodoProps) => void;
  todos: TodoProps[];
  users: UserProps[];
}

export const TodoForm: React.FC<Props> = ({ addTodo, todos, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    } else {
      setUserError('');
    }

    if (!isValid) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: TodoProps = {
      id: newId,
      title,
      userId: Number(userId),
      completed: false,
      user: users.find(user => user.id === Number(userId)) || null,
    };

    addTodo(newTodo);
    setTitle('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            if (titleError) {
              setTitleError('');
            }
          }}
          placeholder="Enter a todo title"
        />
        {titleError && (
          <span className="error" data-cy="titleError">
            {titleError}
          </span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => {
            setUserId(e.target.value ? Number(e.target.value) : '');
            if (userError) {
              setUserError('');
            }
          }}
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
        {userError && (
          <span className="error" data-cy="userError">
            {userError}
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
