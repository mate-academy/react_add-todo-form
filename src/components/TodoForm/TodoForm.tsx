import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  onAdd: (todo: Todo) => void;
  users: User[];
};

export const TodoForm = ({ onAdd, users }: Props) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(Boolean(!title));
    setIsUserError(Boolean(!user));

    if (!title || !user) {
      return;
    }

    onAdd({
      id: 0,
      title: title,
      completed: false,
      userId: user,
    });

    setTitle('');
    setUser(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = event.target.value.replace(
      /[^A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9 ]/g,
      '',
    );

    setTitle(cleanedTitle);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setIsUserError(false);
  };

  return (
    <form onSubmit={event => handleSubmit(event)}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => handleTitleChange(event)}
        />
        {isTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          id="user"
          data-cy="userSelect"
          value={user}
          onChange={event => handleUserChange(event)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(currentUser => (
            <option key={currentUser.id} value={currentUser.id}>
              {currentUser.name}
            </option>
          ))}
        </select>

        {isUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
