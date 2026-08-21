import { ChangeEvent, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUserById } from '../../services/user';
import users from '../../api/users';

type Props = {
  onSubmit: (todo: Todo) => void;
  users: User[];
};

export const FormTodo: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const filteredTitle = title.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    onSubmit({
      title: filteredTitle,
      userId,
      id: 0,
      completed: false,
      user: getUserById(userId)!,
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todoTitle">Please enter a title</label>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="title input"
          id="todoTitle"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>
      <div className="field">
        <select
          data-cy="userSelect"
          onChange={handleUserIdChange}
          value={userId}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
