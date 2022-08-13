import usersFromServer from '../../api/users';

interface Props {
  userId: number;
}

const getUser = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId);
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const foundedUser = getUser(userId);

  return (
    <a className="UserInfo" href={`mailto:${foundedUser?.email}`}>
      {foundedUser?.name}
    </a>
  );
};
