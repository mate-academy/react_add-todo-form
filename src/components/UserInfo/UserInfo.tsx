/* eslint-disable no-console */
import { useState } from 'react';
import { Users } from '../../App';

interface Props {
  users: Users[];
  onSelect: (select: number) => void;
  errors: boolean; //props
  onErrors: (select: boolean) => void;
}

export const UserInfo: React.FC<Props> = ({
  users,
  onSelect,
  errors,
  onErrors,
}) => {
  const [selectedUser, setSelectedUser] = useState<number>(0);

  const selectValidation = (selectItem: number) => {
    setSelectedUser(selectItem);

    if (selectItem === 0) {
      onErrors(true);
    } else {
      onErrors(false);
    }

    onSelect(selectItem);
  };

  console.log(errors);

  return (
    <div className="field">
      <select
        data-cy="userSelect"
        value={selectedUser}
        onChange={event => selectValidation(+event.currentTarget.value)}
      >
        <option value={0} disabled>
          Choose a user
        </option>

        {users.map(person => {
          return (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          );
        })}
      </select>

      {errors && <span className="error">Please choose a user</span>}
    </div>
  );
};
