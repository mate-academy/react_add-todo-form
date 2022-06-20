import { FC } from 'react';
import { User } from '../../app.typedefs';

type UserType = {
  user: User,
};

export const UserInfo: FC<UserType> = ({ user }) => {
  const {
    id,
    username,
    email,
  } = user;

  return (
    <ul className="user-info" key={id}>
      <li className="user-info__item" data-cy="username">
        {`Username: ${username}`}
      </li>
      <li className="user-info__item" data-cy="email">
        {`email: ${email}`}
      </li>
    </ul>
  );
};
