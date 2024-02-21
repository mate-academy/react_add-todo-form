import { User } from '../Types/types';

export const UserInfo = ({ user }: { user: User }) => {
  const {
    email, name,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
