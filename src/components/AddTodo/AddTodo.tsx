import {
  ChangeEvent,
  FC, FormEvent, useState,
} from 'react';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';

type Props = {
  users: User[]
  onSubmit: (newTodo: Omit<Todo, 'id'>) => void
};

export const AddTodo: FC<Props> = ({ users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(e.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, ''));
  };

  const handleUserIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserIdError(false);
    setUserId(+e.target.value);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimedTitle = title.trim();

    setTitleError(!trimedTitle);
    setUserIdError(!userId);

    if (!trimedTitle || !userId) {
      return;
    }

    onSubmit({ title: trimedTitle, userId, completed: false });
    resetForm();
  };

  return (
    <div>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Todo title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="do something"
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              defaultValue={0}
              value={userId?.toString()}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
