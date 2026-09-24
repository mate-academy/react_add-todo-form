import { useState } from 'react';
import { User } from '../../types/User';
import { getUserById } from '../../utils/users';

const defaultValues = {
  title: '',
  user: '',
};

type FormValues = typeof defaultValues;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ title, user }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!title) {
    errors.title = 'Please enter a title';
  }

  if (!user) {
    errors.user = 'Please choose a user';
  }

  return errors;
}

type Props = {
  onAdd: (title: string, user: User) => void;
  users: User[];
};

export const TodoForm = ({ onAdd, users }: Props) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onAdd(values.title, getUserById(Number(values.user)));
    setValues(defaultValues);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues(currentValues => ({ ...currentValues, [name]: value }));

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {'Title: '}
        <input
          type="text"
          name="title"
          data-cy="titleInput"
          placeholder="Enter a title "
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && (
          <span className="error" data-cy="titleError">
            {errors.title}
          </span>
        )}
      </label>
      <br />
      <label>
        {'User: '}
        <select
          name="user"
          data-cy="userSelect"
          value={values.user}
          onChange={handleChange}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.user && (
          <span className="error" data-cy="userError">
            {errors.user}
          </span>
        )}
      </label>
      <br />
      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
