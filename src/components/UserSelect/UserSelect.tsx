import { ReactElement, SetStateAction } from 'react';
import { User, FormType } from '../../types';

export const UserSelect = ({
  form,
  users,
  selectedValue,
  onChange,
}: {
  form: FormType;
  users: User[];
  selectedValue: number;
  onChange: (value: SetStateAction<FormType>) => void;
}): ReactElement => {
  return (
    <select
      id="user"
      data-cy="userSelect"
      value={`${selectedValue}`}
      onChange={event => {
        onChange({
          ...form,
          selectedUser: Number(event.target.value),
          selectedUserError: false,
        });
      }}
    >
      <option value="0" disabled>
        Choose a user
      </option>

      {users.map(user => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
