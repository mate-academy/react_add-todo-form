import { IUser } from '../../interface/IUser';

type Props = {
  user: IUser | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <p>No user information available.</p>;
  }

  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
