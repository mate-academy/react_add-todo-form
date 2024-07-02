import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { FormData } from '../../types/FormData';

const defaultValues = {
  title: '',
  user: 0,
};

const defaultErrors = {
  title: '',
  user: '',
};

type Props = {
  onAddTodo: (data: FormData) => void;
};

export const Form: React.FC<Props> = ({ onAddTodo }) => {
  const [formValues, setFormValues] = useState<FormData>(defaultValues);
  const [errorMessages, setErrorMessages] = useState<FormData>(defaultErrors);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    const lastChar = value.at(-1) || '';
    let validValue = value;

    if (!/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9 ]*$/.test(lastChar)) {
      validValue = validValue.replace(lastChar, '');
    }

    setFormValues(values => ({
      ...values,
      [id]: validValue,
    }));

    setErrorMessages(errors => ({ ...errors, [id]: '' }));
  };

  const validateData = () => {
    const { title, user } = formValues;

    setErrorMessages({
      title: 'Please enter a title',
      user: 'Please choose a user',
    });

    if (!title && user) {
      setErrorMessages(errors => ({ ...errors, user: '' }));

      return;
    }

    if (!user && title) {
      setErrorMessages(errors => ({ ...errors, title: '' }));

      return;
    }

    if (!user && !title) {
      return;
    } else {
      setErrorMessages(defaultErrors);

      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateData()) {
      onAddTodo(formValues);
      setFormValues(defaultValues);
    } else {
      return;
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          value={formValues.title}
          placeholder="Enter a title"
          onChange={handleChange}
        />
        {errorMessages.title && (
          <span className="error">{errorMessages.title}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          data-cy="userSelect"
          id="user"
          value={formValues.user}
          onChange={handleChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {errorMessages.user && (
          <span className="error">{errorMessages.user}</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
