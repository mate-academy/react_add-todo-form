import User from '../../interfaces/User';

interface Props {
  user: User;
}

export const UserInfo = ({ user: { email, name } }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
