import { User } from '../../types/User';

type Prop = {
  user: User;
};

export const UserInfo: React.FC<Prop> = ({ user }) => {
  const {
    email,
    name,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
