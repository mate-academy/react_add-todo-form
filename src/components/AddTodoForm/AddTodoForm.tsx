import { FormEvent, useState } from 'react';
import { AddTodoFormValues, Todo, User } from '../../types/types';
import {
  DEFAULT_VALUES,
  MISSING_TITLE_ERROR,
  MISSING_USER_ERROR,
} from './constants';

type Props = {
  users: User[];
  nextId: number;
  onAddTodo: (todo: Todo) => void;
};

export const AddTodoForm: React.FC<Props> = ({ users, nextId, onAddTodo }) => {
  const [formValues, setFormValues] =
    useState<AddTodoFormValues>(DEFAULT_VALUES);
  const [titleError, setTitleError] = useState<null | string>(null);
  const [userError, setUserError] = useState<null | string>(null);

  const handleChange = (
    field: keyof AddTodoFormValues,
    value: string | number,
  ) => {
    setFormValues(prevValues => ({ ...prevValues, [field]: value }));

    switch (field) {
      case 'title':
        setTitleError(null);
        break;
      case 'userId':
        setUserError(null);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setFormValues(DEFAULT_VALUES);
    setTitleError(null);
    setUserError(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { title, userId } = formValues;
    const isFormValid = title && userId;

    if (!isFormValid) {
      setTitleError(title.trim() ? null : MISSING_TITLE_ERROR);
      setUserError(userId ? null : MISSING_USER_ERROR);

      return;
    }

    const newTodo = {
      id: nextId,
      title: title.trim(),
      completed: false,
      userId: userId,
    };

    onAddTodo(newTodo);
    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          type="text"
          id="titleInput"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={formValues.title}
          onChange={event => {
            handleChange('title', event.target.value);
          }}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>

        <select
          id="userSelect"
          data-cy="userSelect"
          value={formValues.userId}
          onChange={event => {
            handleChange('userId', +event.target.value);
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

        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
