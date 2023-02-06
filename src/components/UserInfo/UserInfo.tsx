import { User } from '../../types/User';

type Props = {
  user: User | undefined,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (user) {
    const { name, email } = user;

    return (
      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    );
  }

  return (
    <a className="UserInfo" href="./">
      Unknown user
    </a>
  );
};
