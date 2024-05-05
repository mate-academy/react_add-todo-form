import { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';

import './AddTodoForm.scss';

type Props = {
  addTodo: (arg0: Todo) => void;
};

const defaultValues = { title: '', userId: 0 };
const defaultErrors = { title: '', user: '' };

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [fields, setFields] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, title: event.target.value }));
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: '' }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFields(prev => ({ ...prev, userId: parseInt(event.target.value) }));
    if (errors.user) {
      setErrors(prev => ({ ...prev, user: '' }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (fields.title.trim() === '') {
      setErrors(prev => ({ ...prev, title: 'Please enter a title' }));
      valid = false;
    }

    if (fields.userId === 0) {
      setErrors(prev => ({ ...prev, user: 'Please choose a user' }));
      valid = false;
    }

    if (valid) {
      addTodo({
        id: 0,
        title: fields.title,
        userId: fields.userId,
        completed: false,
      });
      setFields(defaultValues);
      setErrors(defaultErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-field">
        <label>
          Title:
          <input
            onChange={handleTitleChange}
            value={fields.title}
            data-cy="titleInput"
            type="text"
            name="title"
            placeholder="Enter a title"
          />
        </label>
        {errors.title && <span className='error'>{errors.title}</span>}
      </div>
      <div className="form-field">
        <label>
          User:
          <select
            onChange={handleUserChange}
            data-cy="userSelect"
            name="user"
            value={fields.userId.toString()}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {errors.user && <span className='error'>{errors.user}</span>}
      </div>

      <button data-cy="submitButton" type="submit">Add</button>
    </form>
  );
};
