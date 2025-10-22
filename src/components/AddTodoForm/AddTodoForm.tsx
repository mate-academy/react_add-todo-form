import { FormEvent, useState, ChangeEvent } from 'react';
import { User } from '../../domain/User';
import { Todo } from '../../domain/Todo';

type AddTodoFormProps = {
  users: User[];
  onSubmit: (todo: Omit<Todo, 'id' | 'user'>) => void;
};

export const AddTodoForm = ({ users, onSubmit }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<string | null>(null);

  const [ownerId, setOwnerId] = useState<number>(0);
  const [ownerError, setOwnerError] = useState<string | null>(null);

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);
    setOwnerId(0);
    setOwnerError(null);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (titleError) {
      setTitleError(null);
    }

    setTitle(e.target.value.trimStart());
  };

  const handleOwnerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newId = +e.target.value;

    if (ownerError && newId !== 0) {
      setOwnerError(null);
    }

    setOwnerId(newId);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(null);
    setOwnerError(null);

    const normalizedTitle = title.trim();
    let hasError = false;

    if (!normalizedTitle) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (ownerId === 0) {
      setOwnerError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      title: normalizedTitle,
      completed: false,
      userId: ownerId,
    };

    onSubmit(newTodo);
    handleResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todo-title">Todo title:</label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-select">User:</label>
        <select
          id="user-select"
          data-cy="userSelect"
          value={ownerId}
          onChange={handleOwnerChange}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {ownerError && <span className="error">{ownerError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
