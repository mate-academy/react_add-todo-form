import { UserInfo as UserInfoType } from '../../types/User';

type Props = {
  user: UserInfoType;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
