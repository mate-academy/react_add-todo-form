import User from '../../interfaces/User';

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
