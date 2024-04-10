import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  const emails = `mailto:${email}`;

  return (
    <a className="UserInfo" href={emails}>
      {name}
    </a>
  );
};
