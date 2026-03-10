import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) =>
  user && (
    <a className={String(user.id)} href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
