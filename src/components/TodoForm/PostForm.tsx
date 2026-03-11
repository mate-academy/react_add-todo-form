import React, { useState } from 'react';
import { User } from '../../types/User';

type TodoForm = {
  title: string;
  userId: string;
};

type Props = {
  onSubmit: (data: { title: string; userId: number }) => void;
  users: User[];
};

export const PostForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [newForm, setNewForm] = useState<TodoForm>({
    title: '',
    userId: '',
  });

  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleChange = (field: keyof TodoForm) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setNewForm(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (field === 'title') {
        setHasTitleError(false);
      }

      if (field === 'userId') {
        setSelectError(false);
      }
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const title = newForm.title.trim();
    const userId = Number(newForm.userId);

    const titleIsValid = title !== '';
    const userIsValid = newForm.userId !== '';

    setHasTitleError(!titleIsValid);
    setSelectError(!userIsValid);

    if (!titleIsValid || !userIsValid) {
      return;
    }

    onSubmit({ title, userId });

    setNewForm({
      title: '',
      userId: '',
    });
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title </label>
        <input
          type="text"
          id="titleInput"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={newForm.title}
          onChange={handleChange('title')}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={newForm.userId}
          onChange={handleChange('userId')}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {selectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
