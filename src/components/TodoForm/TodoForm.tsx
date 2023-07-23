import { useState } from 'react';
import { ToDo } from '../../types/ToDo';
import { User } from '../../types/User';

type Props = {
  users: User[],
  newId: number,
  onAdd: (todo: ToDo) => void,
};

export const TodoForm: React.FC<Props> = ({ users, newId, onAdd }) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserChosen, setIsUserChosen] = useState(false);

  const newTodo: ToDo = {
    id: newId,
    title,
    completed,
    userId,
  };

  const handleTitleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const handleUserOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserChosen(false);
  };

  const reset = () => {
    setTitle('');
    setCompleted(false);
    setUserId(0);

    setIsTitleEmpty(false);
    setIsUserChosen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleEmpty(title.trim().length === 0);
    setIsUserChosen(userId === 0);

    if (title.trim().length !== 0 && userId !== 0) {
      onAdd(newTodo);
      reset();
    }
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={event => handleTitleOnChange(event)}
            />

            {isTitleEmpty
            && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => handleUserOnChange(event)}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map((user: User) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>

            {isUserChosen
            && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
