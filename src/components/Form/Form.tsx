import { useState } from 'react';
import { User } from '../../types/User';
import { TodoExtended } from '../../types/TodoExtended';
import { findUserById } from '../../utils/findUserById';
import './Form.scss';

type Props = {
  user: User[];
  onAdd: (todoData: TodoExtended) => void;
  maxTodoId: number;
};

type FormData = {
  title: string;
  userId: number;
};

const initialFormData: FormData = {
  title: '',
  userId: 0,
};

export const Form: React.FC<Props> = ({ user, onAdd, maxTodoId }) => {
  const [isError, setError] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isFormFill = (Object.keys(formData) as Array<keyof FormData>).every(
      field => !!formData[field],
    );

    if (!isFormFill) {
      setError(true);

      return;
    }

    const todoData = {
      id: maxTodoId + 1,
      ...formData,
      completed: false,
      user: findUserById(user, formData.userId),
    };

    onAdd(todoData);
    setError(false);
    setFormData(initialFormData);
  }

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      className="form"
    >
      <div className="form__field">
        <label htmlFor="title" className="form__label">
          Title:
        </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={formData.title}
          onChange={event =>
            setFormData(prev => ({ ...prev, title: event.target.value }))
          }
        />
        {isError && formData.title === '' && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="form__field">
        <label htmlFor="user" className="form__label">
          User:
        </label>
        <select
          data-cy="userSelect"
          id="user"
          value={formData.userId}
          onChange={event =>
            setFormData(prev => ({
              ...prev,
              userId: Number(event.target.value),
            }))
          }
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {user.map(userData => (
            <option value={userData.id} key={userData.id}>
              {userData.name}
            </option>
          ))}
        </select>

        {isError && formData.userId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        className="button is-success"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
