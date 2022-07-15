import { User } from '../../types/User';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <p data-cy="username">{`Name: ${user.name}`}</p>
      <p data-cy="email">{`Email: ${user.email}`}</p>
    </>
  );
};
