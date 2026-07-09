import { UserType } from '../../types/UserType';

interface Props {
  user: UserType | undefined;
}

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
