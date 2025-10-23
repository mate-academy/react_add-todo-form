import { ChangeEvent, FC } from 'react';
import { User } from '../../types/user';
import { FormErrors } from '../../types/formErrors';

interface Props {
  onUserChange: (userId: number) => void;
  onErrorsChange: (payload: FormErrors) => void;
  selectedUserId: number;
  errors: FormErrors;
  users: User[];
}

export const UserField: FC<Props> = ({
  onUserChange,
  onErrorsChange,
  selectedUserId,
  errors,
  users,
}) => {
  const handleSelectedChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onUserChange(Number(event.target.value));
    onErrorsChange({ ...errors, user: '' });
  };

  return (
    <div className="field">
      <label htmlFor="user">User</label>
      <select
        id="user"
        data-cy="userSelect"
        value={selectedUserId}
        onChange={handleSelectedChange}
      >
        <option value="0" disabled>
          Choose a user
        </option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {errors.user && (
        <span className="error" data-cy="userError">
          {errors.user}
        </span>
      )}
    </div>
  );
};
