import User from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo = ({ user }: Props) => {
  const { email, name } = user;

  return (
    <a
      className="UserInfo"
      href={`mailto:${email}`}
    >
      {name.trim()}
    </a>
  );
};
