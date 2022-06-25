import { FC } from 'react';

interface UserInfoProps {
  id: number;
  name: string;
  email: string;
}

export const UserInfo: FC<UserInfoProps> = ({
  id,
  name = 'Unknown',
  email,
}) => {
  return (
    <ul key={id} className="UserInfo">
      <li data-cy="username">
        {`Name: ${name}`}
      </li>
      {'    '}
      <li data-cy="email">
        {`Email: ${email}`}
      </li>
    </ul>
  );
};
