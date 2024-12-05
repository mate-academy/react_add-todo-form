import { User } from '../../types';

type Props = {
  userId: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  hasError: boolean;
  users: User[];
};

export const SelectUser: React.FC<Props> = ({
  userId,
  onChange,
  hasError,
  users,
}) => {
  return (
    <div className="field">
      <label>
        User:{' '}
        <select data-cy="userSelect" value={userId} onChange={onChange}>
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(person => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
      </label>

      {hasError && <span className="error">Please choose a user</span>}
    </div>
  );
};
