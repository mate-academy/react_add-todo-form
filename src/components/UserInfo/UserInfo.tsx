import { User } from '../../types/user';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
