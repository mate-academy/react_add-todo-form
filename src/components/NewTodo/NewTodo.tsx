import { useState } from 'react';
import { User } from '../../types/User';

type NewTodoProps = {
  onAddTodo: (todo: { title: string; userId: number }) => void;
  users: User[];
};

export const NewTodo = ({ onAddTodo, users }: NewTodoProps) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const isFormValid = title.trim() && userId !== 0;

  function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAddTodo({ title, userId });

    setTitle('');
    setUserId(0);
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handlerSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(Number(event.target.value));
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <span className="error">Please choose a user</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
