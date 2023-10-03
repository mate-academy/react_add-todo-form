import React, { useState } from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

const DEFAULT_INPUTS = {
  title: '',
  userId: 0,
};

const DEFAULT_INPUTS_ERRORS = {
  title: false,
  userId: false,
};

interface Props {
  onAdd: (newTodoInfo: Pick<Todo, 'title' | 'userId'>) => void;
  users: User[],
}

export const TodoForm: React.FC<Props> = ({
  onAdd,
  users,
}) => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [inputsErrors, setInputsErrors] = useState(DEFAULT_INPUTS_ERRORS);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    const newValue = name === 'userId' ? +value : value;

    setInputs(prevFields => ({
      ...prevFields,
      [name]: newValue,
    }));

    setInputsErrors(prevErrors => ({
      ...prevErrors,
      [name]: !newValue,
    }));
  };

  const resetForm = () => {
    setInputs(DEFAULT_INPUTS);
    setInputsErrors(DEFAULT_INPUTS_ERRORS);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setInputsErrors(() => ({
      title: !inputs.title.trim(),
      userId: !inputs.userId,
    }));

    setInputs(prevInputs => ({
      ...prevInputs,
      title: prevInputs.title.trim(),
    }));

    if (!inputs.title.trim() || !inputs.userId) {
      return;
    }

    onAdd(inputs);
    resetForm();
  };

  const handleBlur = () => {
    setInputs(prevFields => ({
      ...prevFields,
      title: prevFields.title.trim(),
    }));
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        {'Title: '}
        <input
          type="text"
          data-cy="titleInput"
          value={inputs.title}
          placeholder="Enter title"
          onChange={handleInputChange}
          onBlur={handleBlur}
          name="title"
        />
        {inputsErrors.title && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        {'User: '}
        <select
          data-cy="userSelect"
          value={inputs.userId}
          onChange={handleInputChange}
          name="userId"
        >
          <option value="0" defaultChecked>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {inputsErrors.userId && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
