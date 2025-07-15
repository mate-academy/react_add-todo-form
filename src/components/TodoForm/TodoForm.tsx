import React, { useState } from 'react';

import { Task } from '../../types/Task';
import { InputField } from '../InputField';
import { SelectField } from '../SelectField';

interface Props {
  onSubmit: (newTask: Task) => void;
}

export const TodoForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [count, setCount] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setUserId(0);
    setCount(() => count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const hasNoTitle = !title.trim();
    const hasNoUserId = !userId;

    if (hasNoTitle) {
      setHasTitleError(true);
    }

    if (hasNoUserId) {
      setHasUserError(true);
    }

    if (hasNoTitle || hasNoUserId) {
      return;
    }

    const task: Task = {
      id: 0,
      title: title,
      completed: false,
      userId: userId,
    };

    onSubmit(task);
    clearForm();
  };

  return (
    <form key={count} onSubmit={handleSubmit} className="box">
      <InputField
        fieldName="title"
        value={title}
        onChange={setTitle}
        hasError={hasTitleError}
        updateHasError={setHasTitleError}
      />

      <SelectField
        fieldName="user"
        value={userId}
        onChange={setUserId}
        hasError={hasUserError}
        updateHasError={setHasUserError}
      />

      <button
        type="submit"
        data-cy="submitButton"
        className="button mt-3 is-link"
      >
        Add
      </button>
    </form>
  );
};
