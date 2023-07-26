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
  return (
    <div className="field">
      <select
        data-cy="userSelect"
        onChange={(e) => setUser(+e.target.value)}
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
      {errorUser && user === 0
        ? <span className="error">Please choose a user</span> : null}
    </div>
  );
};
