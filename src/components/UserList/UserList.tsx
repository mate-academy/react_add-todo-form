import { User } from '../../types/User';

type Props = {
  users: User[]
};

export const UserList: React.FC<Props> = ({ users }) => {
  return (
    <>
      <option
        value="0"
        disabled
        selected
      >
        Choose a user
      </option>
      {users.map((user) => {
        return (
          <option
            value={user.id}
            key={user.id}
          >
            {user.name}
          </option>
        );
      })}
    </>
  );
};
