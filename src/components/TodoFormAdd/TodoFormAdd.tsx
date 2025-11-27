import React from 'react';
import { User } from '../../Types/User';

type Props = {
  onAddTodo: (title: string, userId: number) => void;
  users: User[];
};

const defaultValues = {
  title: '',
  userId: 0,
};

type FormValues = typeof defaultValues;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ title, userId }: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!title.trim()) {
    errors.title = 'Please enter a title';
  }

  if (!userId) {
    errors.userId = 'Please choose a user';
  }

  return errors;
}

export const TodoFormAdd: React.FC<Props> = ({ onAddTodo, users }) => {
  const [values, setValues] = React.useState<FormValues>(defaultValues);
  const [errors, setErrors] = React.useState<FormErrors>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onAddTodo(values.title.trim(), Number(values.userId));

    setValues(defaultValues);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  return (
    <>
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={values.title}
            name="title"
            onChange={handleChange}
            type="text"
            data-cy="titleInput"
            placeholder="Your title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <select
            name="userId"
            value={values.userId}
            onChange={handleChange}
            data-cy="userSelect"
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

          {errors.userId && <span className="error">{errors.userId}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
