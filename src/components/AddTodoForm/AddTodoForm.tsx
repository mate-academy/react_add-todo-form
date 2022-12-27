import { useCallback, useState } from 'react';
import { User } from '../../types/User';
import './index.scss';

enum ChangeType {
  TITLE,
  USER,
  COMPLETED,
}

type Props = {
  handleSubmit: (
    user: number,
    title: string,
    completed: boolean,
  ) => void;
  users: User[],
};

export const AddTodoForm = ({ handleSubmit, users }: Props) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({
    isUserNotSelected: false,
    isTitleEmpty: false,
  });

  const clearForm = useCallback(
    () => {
      setTitle('');
      setUser(0);
      setCompleted(false);
    },
    [],
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      field: ChangeType,
    ) => {
      switch (field) {
        case ChangeType.TITLE:
          setTitle(e.target.value);
          setErrors(prev => ({
            isUserNotSelected: prev.isUserNotSelected,
            isTitleEmpty: false,
          }));
          break;
        case ChangeType.USER:
          setUser(Number.parseInt(e.target.value, 10));
          setErrors(prev => ({
            isUserNotSelected: false,
            isTitleEmpty: prev.isTitleEmpty,
          }));
          break;
        default: // ChangeType.COMPLETED
          setCompleted(prev => !prev);
          break;
      }
    }, [],
  );

  const onSubmit = (
    e: React.SyntheticEvent | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setErrors({
      isUserNotSelected: user === 0,
      isTitleEmpty: title.length === 0,
    });

    if (user === 0 || title.length === 0) {
      return;
    }

    handleSubmit(
      user,
      title,
      completed,
    );
    clearForm();
  };

  return (
    <form
      action="/api/users"
      className="form"
      method="POST"
      onSubmit={e => onSubmit(e)}
    >
      <h1
        className="form__title"
      >
        Add todo form
      </h1>
      <div className="formfield">
        <label
          htmlFor="title"
          className="formfield__label"
        >
          Title:
        </label>
        <input
          id="title"
          className="formfield__input"
          name="title"
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={e => handleChange(e, ChangeType.TITLE)}
          placeholder="Enter title..."
        />
        {errors.isTitleEmpty && (
          <span className="error">
            Please enter a title
          </span>
        )}
      </div>

      <div className="formfield">
        <select
          className="formfield__input"
          onChange={e => handleChange(e, ChangeType.USER)}
          data-cy="userSelect"
          value={user}
        >
          <option
            className="formfield__option"
            value={0}
            key={0}
            disabled
          >
            Choose a user
          </option>
          {users.map(item => (
            <option
              key={item.username}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
        {errors.isUserNotSelected
        && <span className="error">Please choose a user</span>}
      </div>

      <div
        className="formfield formfield__submit"
      >
        <div className="formfield__completed">
          <input
            className="formfield__checkbox"
            type="checkbox"
            name="completed"
            id="completed"
            checked={completed}
            onChange={e => handleChange(e, ChangeType.COMPLETED)}
          />
          <label
            htmlFor="completed"
            className="formfield__label formfield__label--cb"
          >
            :Completed
          </label>
        </div>

        <button
          type="submit"
          className="formfield__button"
          data-cy="submitButton"
          onClick={e => onSubmit(e)}
        >
          Add
        </button>
      </div>

    </form>
  );
};
