import { useState } from 'react';
import usersFromServer from '../../api/users';
import { TodoWithUser } from '../../App';

type AddTodoFormProps = {
  onAddTodo: (newTodo: TodoWithUser) => void;
  currentTodos: TodoWithUser[];
};

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  onAddTodo,
  currentTodos,
}) => {
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    const newId =
      currentTodos.length > 0
        ? Math.max(...currentTodos.map(todo => todo.id)) + 1
        : 1;

    const user = usersFromServer.find(u => u.id === userId);

    const newTodo: TodoWithUser = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    onAddTodo(newTodo);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">
          Title:&nbsp;
          <input
            id="title"
            data-cy="titleInput"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
        </label>
        {hasTitleError && (
          <span className="error" data-cy="titleError">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {hasUserIdError && (
          <span className="error" data-cy="userError">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
