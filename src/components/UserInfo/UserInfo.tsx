import { User } from '../../types/user';

type Props = {
  user: User | null;
};

export const UserInfo = ({ user }: Props) =>
  user && (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
