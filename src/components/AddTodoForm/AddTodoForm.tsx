import { useState } from 'react';
import { ITodo } from '../../types';
import { useUsers } from '../UsersProvider/context/UsersContext';

type Props = {
  todos: ITodo[];
  onTodoAdd: (newTodo: ITodo) => void;
};

const initialFormValues = {
  title: '',
  userId: 0,
};

const initialFormErrors = {
  isEmptyTitle: false,
  isEmptyUserId: false,
};

export const AddTodoForm: React.FC<Props> = ({ todos, onTodoAdd }) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const { users } = useUsers();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormErrors({
      ...formErrors,
      isEmptyTitle: false,
    });

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormErrors({
      ...formErrors,
      isEmptyUserId: false,
    });

    setFormValues({
      ...formValues,
      [name]: +value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = formValues;

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !userId) {
      setFormErrors({
        isEmptyTitle: !trimmedTitle,
        isEmptyUserId: !userId,
      });

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    onTodoAdd({
      id: maxId + 1,
      title: trimmedTitle,
      userId,
      completed: false,
    });

    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleId">Title:</label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleId"
            name="title"
            placeholder="Enter a title"
            value={formValues.title}
            onChange={handleTitleChange}
          />

          {formErrors.isEmptyTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User:</label>

          <select
            data-cy="userSelect"
            id="userId"
            name="userId"
            value={formValues.userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>

          {formErrors.isEmptyUserId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
