import { User } from '../../types/types';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null; // Render nothing if user is null
  }

  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
