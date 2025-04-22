import React, { ChangeEventHandler, useState } from 'react';
import { Todo } from '../../types/Todo';
import { users } from '../../services/users';

interface Props {
  handleAdd: (todo: Todo) => void;
}

const defaultValues = {
  title: '',
  userId: 0,
};

export const TodoForm: React.FC<Props> = ({ handleAdd }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [submitErrors, setSubmitErrors] = useState({
    title: false,
    userId: false,
  });

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (formValues.title && formValues.userId) {
      handleAdd({ ...formValues, id: 0, completed: false, user: null });
      setFormValues(defaultValues);
    } else {
      setSubmitErrors({
        title: !formValues.title,
        userId: !formValues.userId,
      });
    }
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const title = event.target.value;

    setFormValues({ ...formValues, title });
    if (submitErrors.title && title) {
      setSubmitErrors({ ...submitErrors, title: false });
    }
  };

  const handleUserIdChange: ChangeEventHandler<HTMLSelectElement> = event => {
    const userId = +event.target.value;

    setFormValues({ ...formValues, userId });
    if (submitErrors.userId && userId) {
      setSubmitErrors({ ...submitErrors, userId: false });
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
      <div className="field">
        <input
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={formValues.title}
          onChange={handleTitleChange}
        />
        {submitErrors.title && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={formValues.userId}
          onChange={handleUserIdChange}
        >
          <option key="0" value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {submitErrors.userId && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
