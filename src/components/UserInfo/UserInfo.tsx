import { UserInfoProps } from '../../types';

export const UserInfo = ({ user }: UserInfoProps) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
