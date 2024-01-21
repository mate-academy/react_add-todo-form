import { User } from '../../types/User';

type Props = {
  value: number,
  label: string,
  users: User[],
  onChange?: (newValue: number) => void,
  hasError?: boolean,
};

export const UserInfo: React.FC<Props> = ({
  value,
  label,
  users,
  onChange = () => {},
  hasError = false,
}) => {
  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(+event.target.value);
  };

  return (
    <div className="field">
      <label
        className="label"
        htmlFor="user-id"
      >
        {label}
      </label>

      <select
        id="user-id"
        data-cy="userSelect"
        value={value}
        onChange={handleUserIdChange}
      >
        <option value="0" disabled>Choose a user</option>

        {users.map(user => {
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

      {hasError && (
        <span className="error">
          Please choose a user
        </span>
      )}
    </div>
  );
};
