import { ChangeEvent } from 'react';
import { User } from '../../types/User';
import classNames from 'classnames';

interface Props {
  value: number;
  users: User[];
  isError: boolean;
  callback: (id: number) => void;
}

export const Select: React.FC<Props> = ({
  users,
  isError,
  value,
  callback,
}) => {
  function handleChanges(event: ChangeEvent<HTMLSelectElement>) {
    callback(+event.target.value);
  }

  return (
    <div className="field">
      <label htmlFor="userId" className="label">
        Choose a user
      </label>
      <div className="control">
        <div
          className={classNames('select', {
            'is-danger': isError && value === 0,
          })}
        >
          <select
            id="userId"
            data-cy="userSelect"
            onChange={handleChanges}
            required
            value={value}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isError && value === 0 && (
        <p className="error help is-danger">Please choose a user</p>
      )}
    </div>
  );
};
