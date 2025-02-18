import React, { useState } from 'react';
import { CreateFormValues, User } from '../../types';

type FormErrors = {
  [key in keyof CreateFormValues]: string;
};

type Props = {
  create(todo: CreateFormValues): void;
  users: User[];
};

const DEFAULT_FORM_VALUES: CreateFormValues = {
  title: '',
  userId: 0,
};

export const CreateForm: React.FC<Props> = ({ create, users }) => {
  const [submitCount, setSubmitCount] = useState(0);
  const [formValues, setFormValues] =
    useState<CreateFormValues>(DEFAULT_FORM_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    userId: '',
  });

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [name]: name === 'userId' ? +value : value,
    }));

    setFormErrors(currentFormErrors => ({
      ...currentFormErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidUserId = Boolean(formValues.userId);
    const isValidTitle = Boolean(formValues.title.trim());

    setFormErrors({
      userId: isValidUserId ? '' : 'Please choose a user',
      title: isValidTitle ? '' : 'Please enter a title',
    });

    if (!isValidUserId || !isValidTitle) {
      return;
    }

    create(formValues);
    setSubmitCount(currentSubmitCount => currentSubmitCount + 1);
    setFormValues(DEFAULT_FORM_VALUES);
  };

  return (
    <form
      key={submitCount}
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          {`Title: `}
          <input
            placeholder="Enter a title"
            name="title"
            type="text"
            data-cy="titleInput"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>

        {Boolean(formErrors.title) && (
          <span className="error">{formErrors.title}</span>
        )}
      </div>

      <div className="field">
        <label>
          {`User: `}
          <select
            name="userId"
            data-cy="userSelect"
            onChange={handleChange}
            value={formValues.userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        {Boolean(formErrors.userId) && (
          <span className="error">{formErrors.userId}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
