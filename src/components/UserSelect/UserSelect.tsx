import { User } from '../../types/User';

type Props = {
  users: User[]
};

export const UserSelect: React.FC<Props> = ({ users }) => {
  return (
    <>
      <option value="0" disabled>
        Choose a user
      </option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  );
};
