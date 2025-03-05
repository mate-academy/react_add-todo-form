import { FC, useState } from 'react';
import { TodoInfo } from '../../types';
import users from '../../api/users';

type AddTodoFormProps = {
  handleSubmit: (todoData: Omit<TodoInfo, 'id'>) => void;
};

type FormFieldsType = Pick<TodoInfo, 'title' | 'userId'>;
type FormFieldsErrorType = Partial<Pick<TodoInfo, 'title'>> & {
  userId?: string;
};

const initialData: FormFieldsType = {
  title: '',
  userId: 0,
};

export const AddTodoForm: FC<AddTodoFormProps> = ({ handleSubmit }) => {
  const [newTodoData, setNewTodoData] = useState<FormFieldsType>(initialData);

  const [newTodoDataErrors, setNewTodoDataErrors] =
    useState<FormFieldsErrorType>({});

  const validateData = (): boolean => {
    setNewTodoDataErrors({});

    const errors: FormFieldsErrorType = {};

    if (!newTodoData.title) {
      errors.title = 'Please enter a title';
    }

    if (newTodoData.userId === 0) {
      errors.userId = 'Please choose a user';
    }

    setNewTodoDataErrors(errors);

    return Object.values(errors).length === 0;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateData()) {
      handleSubmit({
        ...newTodoData,
        completed: false,
      });
      setNewTodoData(initialData);
      setNewTodoDataErrors({});
    }
  };

  const handleChange = (name: string) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;

      if (value) {
        setNewTodoDataErrors(prev => ({
          ...prev,
          [name]: '',
        }));
      }

      setNewTodoData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="tile"
            placeholder="Title"
            value={newTodoData.title}
            onChange={handleChange('title')}
          />
          {newTodoDataErrors.title && (
            <span className="error">{newTodoDataErrors.title}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            onChange={handleChange('userId')}
            value={newTodoData.userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users?.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {newTodoDataErrors.userId && (
            <span className="error">{newTodoDataErrors.userId}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
