import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email, id } = user;

  return (
    <a key={id} className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
