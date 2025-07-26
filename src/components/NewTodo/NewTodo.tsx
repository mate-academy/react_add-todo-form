import { useState } from 'react';
import { Todo, User } from '../../types/types';

type Props = {
  users: User[];
  onAdd: (todo: Omit<Todo, 'id'>) => void;
};

export const NewTodo: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userValue, setUserValue] = useState('0');
  const [titleTouched, setTitleTouched] = useState(false);
  const [selectTouched, setSelectTouched] = useState(false);
  const hasError = titleTouched && !title.trim();
  const selectError = selectTouched && userValue === '0';
  const isInvalid = title.trim() === '' || userValue === '0';

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleTouched(true);
    setSelectTouched(true);

    if (isInvalid) {
      return;
    }

    onAdd({
      title,
      completed: false,
      userId: Number(userValue),
      user: users.find(user => user.id === Number(userValue)) || null,
    });

    setTitle('');
    setUserValue('0');
    setTitleTouched(false);
    setSelectTouched(false);
  };

  return (
    <form onSubmit={addTodo}>
      <div className="field">
        <label htmlFor="titleInputId">Title:</label>
        <input
          placeholder="Enter a title"
          id="titleInputId"
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={event => setTitle(event.target.value)}
          onBlur={() => setTitleTouched(true)}
        />
        {hasError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelectId">User:</label>
        <select
          id="userSelectId"
          data-cy="userSelect"
          value={userValue}
          onChange={event => setUserValue(event.target.value)}
          onBlur={() => setSelectTouched(true)}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
