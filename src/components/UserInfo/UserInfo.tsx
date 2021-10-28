import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <>
      <p>
        <b>Name: </b>
        {name}
      </p>
      <p>
        <b>Email: </b>
        {email}
      </p>
    </>
  );
};
