import { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  users: User[];
  onAdd: (todo: Omit<Todo, 'id'>) => void;
};

export const NewTodo: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);

  const [userSelect, setUserSelect] = useState<number | null>(null);
  const [userSelectHasError, setUserSelectHasError] = useState(false);

  const isAllowedSymbols = (input: string): boolean => {
    // const pattern = /^[a-zA-Z А-ЩЬЮЯҐЄІЇа-щьюяґєії0-9]+$/;
    const pattern = /^[^@!#№$;%:&?8(){}*."\\/|'^,]+$/;

    if (!input) {
      return true;
    }

    return !!input.match(pattern);
  };

  const clearTodoFields = () => {
    setTitle('');
    setUserSelect(null);
  };

  const handlerTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(currentTitle => {
      return isAllowedSymbols(event.target.value)
        ? event.target.value
        : currentTitle;
    });
    setTitleHasError(false);
  };

  const handlerUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(+event.target.value);
    setUserSelectHasError(false);
  };

  const handlerOnSubmit = () => {
    setTitleHasError(!title);
    setUserSelectHasError(!userSelect);

    if (!title || !userSelect) {
      return;
    }

    onAdd({
      title,
      completed: false,
      userId: userSelect,
      user: null,
    });
    clearTodoFields();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handlerOnSubmit();
      }}
    >
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => handlerTitleInput(event)}
        />
        {titleHasError
          && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={userSelect === null ? 0 : userSelect}
          onChange={(event) => handlerUserSelect(event)}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {userSelectHasError
          && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
