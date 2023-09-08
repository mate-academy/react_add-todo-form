import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  onAdd: (newTodo: Todo) => void;
  users: User[],
}
const DEFAULT_INPUTS = {
  title: '',
  userId: 0,
};

const DEFAULT_INPUTS_ERRORS = {
  title: false,
  userId: false,
};

export const TodoForm: React.FC<Props> = ({
  onAdd = () => { },
  users,
}) => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [inputsErrors, setInputsErrors] = useState(DEFAULT_INPUTS_ERRORS);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setInputs(prevFields => ({
      ...prevFields,
      [name]: name === 'userId' ? +value : value,
    }));
    setInputsErrors(prevErrors => ({
      ...prevErrors,
      [name]: !(name === 'userId' ? +value : value),
    }));
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
    setInputsErrors(DEFAULT_INPUTS_ERRORS);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event?.preventDefault();
    setInputsErrors(() => ({
      title: !inputs.title,
      userId: !inputs.userId,
    }));

    if (!inputs.title || !inputs.userId) {
      return;
    }

    onAdd({
      ...inputs,
      id: 0,
      completed: false,
    });
    reset();
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
