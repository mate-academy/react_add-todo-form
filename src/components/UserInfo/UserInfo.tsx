import { FC } from 'react';
import { User } from '../../types/User';

export const UserInfo: FC<{ users: Array<User> }> = ({ users }) => {
  return (
    <>
      {users.map(user => (
        <a className="UserInfo" href={`mailto:${user.email}`} key={user.id}>
          {user.name}
        </a>
      ))}
    </>
  );
};
