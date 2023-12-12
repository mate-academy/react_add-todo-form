import { User } from '../../type/User';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
