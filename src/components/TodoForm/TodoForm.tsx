import { useState } from 'react';
import usersFromServer from '../../api/users';
import { ToDo } from '../../types/ToDo';
import { getUserById } from '../services/getUserById';
import { getUniqueId } from '../services/getUniqueId';

interface Props {
  addToDo: (todo: ToDo) => void,
  todos: ToDo[],
}

export const TodoForm: React.FC<Props> = ({ addToDo, todos }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if ((title && userId)) {
      addToDo({
        title: title.replace(/[^0-9 а-яА-Я a-zA-Z Єє Іі Її \s]/g, ''),
        completed: false,
        userId,
        id: getUniqueId(todos),
        user: getUserById(userId) || null,
      });

      setUserId(0);
      setTitle('');
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(
            user => <option value={user.id}>{user.name}</option>,
          )}
        </select>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
