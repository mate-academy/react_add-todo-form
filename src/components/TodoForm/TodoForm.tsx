import { useState } from 'react';
import { Todo, Todos } from '../../types/Todo';
import { Users } from '../../types/User';
import { getUserById } from '../../utils/getUserById';
import { generateNewId } from '../../utils/generateNewId';

interface Props {
  onSubmit: (todo: Todo) => void,
  users: Users,
  todosArr: Todos,
}

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  users,
  todosArr,
}) => {
  const [title, setTitle] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isUserIdError, setIsUserIdError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '' || userId === 0) {
      setIsTitleError(title.trim() === '');
      setIsUserIdError(userId === 0);
    } else {
      setIsTitleError(false);
      setIsUserIdError(false);

      onSubmit({
        title,
        completed: false,
        userId,
        user: getUserById(userId, users),
        id: generateNewId(todosArr),
      });

      setTitle('');
      setUserId(0);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setIsUserIdError(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          placeholder="Please enter a title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleInput}
        />
        { isTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          placeholder="Please choose a user"
          data-cy="userSelect"
          value={userId}
          onChange={handleSelect}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map(user => {
            const { name, id } = user;

            return <option value={id} key={id}>{name}</option>;
          })}
        </select>
        {isUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
