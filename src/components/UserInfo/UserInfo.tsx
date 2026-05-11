import { User } from '../../entities/user/domain/User';

import './UserInfo.scss';

type UserCardProps = {
  user: User;
};

export function UserInfo({ user }: UserCardProps) {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
}
