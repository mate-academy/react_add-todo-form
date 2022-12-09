import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { useAuthContext } from './Auth/AuthContext';

type Props = {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
};

export const TodoForm: React.FC<Props> = ({
  onSubmit,
  todo,
}) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [completed, setCompleted] = useState(todo?.completed || false);
  const user = useAuthContext();

  const [hasTitleError, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);

    const userId = user?.id;

    if (!title || !userId) {
      return;
    }

    onSubmit({
      title,
      userId,
      completed,
    });

    setCompleted(false);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          Done:
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Save
      </button>
    </form>
  );
};
