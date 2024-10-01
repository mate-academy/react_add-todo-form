import { User } from '../../types/User';

type Props = {
  currentUser: User;
};

export const UserInfo: React.FC<Props> = ({ currentUser }) => {
  const { email, name } = currentUser;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
