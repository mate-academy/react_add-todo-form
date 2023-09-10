import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  onAdd: (newTodo: Todo) => void,
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

export const TodoForm: React.FC<Props> = ({ onAdd = () => {}, users }) => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [errors, setErrors] = useState(DEFAULT_INPUTS_ERRORS);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const parsedValue = name === 'userId' ? +value : value;

    setInputs(prevFields => ({
      ...prevFields,
      [name]: parsedValue,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: !parsedValue,
    }));
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
    setErrors(DEFAULT_INPUTS_ERRORS);
  };

  const isFormValid = !errors.title && !errors.userId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid) {
      onAdd({
        ...inputs,
        id: 0,
        completed: false,
        userId: inputs.userId,
      });
      reset();
    }
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
          onChange={inputChange}
          name="title"
        />
        {errors.title && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        {'User: '}
        <select
          data-cy="userSelect"
          value={inputs.userId}
          onChange={inputChange}
          name="userId"
        >
          <option value="0" defaultChecked>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errors.userId && (
          <span className="error">Please choose a user</span>
        )}
      </div>
      <button type="submit" data-cy="submitButton" disabled={!isFormValid}>
        Add
      </button>
    </form>
  );
};
