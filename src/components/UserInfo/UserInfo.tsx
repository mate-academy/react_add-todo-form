import usersFromServer from '../../api/users';

type Props = {
  idOnUser: number;
};

export const UserInfo: React.FC<Props> = ({ idOnUser }) => {
  const foundUser = usersFromServer.find(user => user.id === idOnUser);

  if (!foundUser) {
    return null;
  }

  return (
    <a
      key={foundUser.id}
      className="UserInfo"
      href={`mailto:${foundUser.email}`}
    >
      {foundUser.name}
    </a>
  );
};
