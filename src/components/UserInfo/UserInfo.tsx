import { User } from '../../types/types';

type Props = {
  users: User[];
  setUser: (n: number) => void;
  user: number;
  errorUser: boolean;
};

export const UserInfo: React.FC<Props> = ({
  users,
  setUser,
  user,
  errorUser,
}) => {
  const handleChange
  = (e: React.ChangeEvent<HTMLSelectElement>) => setUser(+e.target.value);

  return (
    <div className="field">
      <select
        data-cy="userSelect"
        onChange={handleChange}
        value={`${user}`}
      >
        <option value="0" disabled>
          Choose a user
        </option>
        {users.map((userItem) => {
          return (
            <option value={`${userItem.id}`} key={userItem.id}>
              {userItem.name}
            </option>
          );
        })}
      </select>
      {errorUser
        ? <span className="error">Please choose a user</span> : null}
    </div>
  );
};
