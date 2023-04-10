import { useState } from 'react';
import { USER_ID } from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  todo?: Todo;
  onSubmit: (todo: Omit<Todo, 'id'>) => Promise<void>;
};

export const TodoForm: React.FC<Props> = ({ onSubmit, todo }) => {
  const [title, setTitle] = useState(todo?.title || '');
  const [completed, setCompleted] = useState(todo?.completed || false);

  const [hasTitleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAddingError, setHasAddingError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);

    if (!title) {
      return;
    }

    setHasAddingError(false);
    setIsLoading(true);

    try {
      await onSubmit({
        title,
        userId: USER_ID,
        completed,
      });
    } catch {
      setHasAddingError(true);
    }

    setIsLoading(false);
    setCompleted(false);
    setTitle('');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form action="/api/users" method="POST" onSubmit={handleSubmit}>
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

      {hasAddingError && (
        <p>Todo adding failed. Try again</p>
      )}
    </form>
  );
};
