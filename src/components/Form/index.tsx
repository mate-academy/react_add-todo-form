import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';
import usersFromServer from '../../api/users';
import { TodoItem } from '../../types/todo';

interface FormProps {
  updateState: Dispatch<SetStateAction<TodoItem[]>>;
}

const Form: FC<FormProps> = ({ updateState }) => {
  const [formState, setFormState] = useState({
    titleInput: '',
    userSelect: '0',
  });

  const [formErrors, setFormErrors] = useState({
    titleInput: false,
    userSelect: false,
  });

  const getMaxId = (items: TodoItem[]) => {
    const maxId = Math.max(...items.map((item) => item.id));

    return maxId + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.titleInput || formState.userSelect === '0') {
      setFormErrors({
        titleInput: !formState.titleInput,
        userSelect: formState.userSelect === '0',
      });

      return;
    }

    updateState((p) => [
      ...p,
      {
        id: getMaxId(p),
        title: formState.titleInput,
        completed: false,
        userId: +formState.userSelect,
      },
    ]);

    setFormState({ titleInput: '', userSelect: '0' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line max-len
    if (/[^a-zA-Z0-9s\u0020\u0406\u0407\u042c\u045e\u042f\u0456\u0457\u044c\u044e\u044f\u0410-\u0429\u0430-\u0449]/.test(e.target.value)) {
      return;
    }

    if (e.target.value) {
      setFormErrors((p) => ({
        userSelect: p.userSelect,
        titleInput: false,
      }));
    }

    setFormState((p) => ({
      userSelect: p.userSelect,
      titleInput: e.target.value,
    }));
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          placeholder="Title"
          type="text"
          data-cy="titleInput"
          value={formState.titleInput}
          onChange={handleInputChange}
        />

        {formErrors.titleInput && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={formState.userSelect}
          onChange={(e) => {
            if (e.target.value !== '0') {
              setFormErrors((p) => ({
                userSelect: false,
                titleInput: p.titleInput,
              }));
            }

            setFormState((p) => ({
              userSelect: e.target.value,
              titleInput: p.titleInput,
            }));
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>

        {formErrors.userSelect && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default Form;
