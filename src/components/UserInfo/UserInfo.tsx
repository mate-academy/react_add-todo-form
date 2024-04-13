interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  usersFromServer: Users[];
  userId: number;
}

export const UserInfo: React.FC<Props> = ({ usersFromServer, userId }) => {
  const findUser = usersFromServer.find(user => user.id === userId);

  return (
    <>
      {findUser && (
        <a className="UserInfo" href={findUser.email}>
          {findUser.name}
        </a>
      )}
    </>
  );
};
