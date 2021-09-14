import { FC } from 'react';

type Props = {
  users: User[];
};

export const UserList: FC<Props> = ({ users }) => {
  return (
    <>
      <option value="">
        Choose a user
      </option>
      {users.map((user: User) => (
        <option
          value={user.name}
          key={user.id}
        >
          {user.name}
        </option>
      ))}
    </>
  );
};
