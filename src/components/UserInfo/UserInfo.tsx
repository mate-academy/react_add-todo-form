import { User } from '../../types/user';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => (
  <>
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  </>
);
