import { useState } from 'react';
import { User } from '../../types/User';
import usersFromServer from '../../api/users';
import { FieldsForm } from '../../types/FieldsForm';

type Props = {
  onAdd: (newTodo: FieldsForm) => void
};

const valuesOfForm = {
  title: '',
  selectUser: 0,
};

export const Form: React.FC<Props> = ({ onAdd }) => {
  const [fieldsForm, setFieldsForm] = useState<FieldsForm>(valuesOfForm);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUser, setHasErrorUser] = useState(false);

  const handleChangeFields = (
    value: string | number,
    field: string | number,
  ) => {
    setFieldsForm(current => ({ ...current, [field]: value }));
  };

  const resetFieldsForm = () => {
    setFieldsForm(valuesOfForm);
    setHasErrorTitle(false);
    setHasErrorUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleExists = fieldsForm.title.trim();
    const isSelectUser = fieldsForm.selectUser;

    if (!isTitleExists) {
      setHasErrorTitle(true);
    }

    if (!isSelectUser) {
      setHasErrorUser(true);
    }

    if (!isTitleExists || !isSelectUser) {
      return;
    }

    onAdd(fieldsForm);
    resetFieldsForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="title">
          Title:
        </label>

        <input
          id="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={fieldsForm.title}
          onChange={(event) => {
            handleChangeFields(event.target.value, 'title');
          }}
          onBlur={() => setHasErrorTitle(true)}
        />

        {hasErrorTitle && !fieldsForm.title && (
          <span className="error">Please enter a title</span>
        )}

      </div>

      <div className="field">
        <label className="label" htmlFor="user">
          User:
        </label>

        <select
          id="user"
          data-cy="userSelect"
          value={fieldsForm.selectUser}
          onChange={(event) => {
            handleChangeFields(+event.target.value, 'selectUser');
          }}
          onBlur={() => setHasErrorUser(true)}
          required
        >
          <option value={0} disabled>Choose a user</option>

          {usersFromServer.map((user: User) => {
            return (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            );
          })}
        </select>

        {hasErrorUser && !fieldsForm.selectUser && (
          <span className="error">Please choose a user</span>
        )}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
