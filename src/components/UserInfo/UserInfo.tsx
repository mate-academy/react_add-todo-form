import usersFromServer from '../../api/users';

interface UserInfoProps {
  userId: number;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const getUser = (id: number) => {
    const matchingUser = usersFromServer.find(user => user.id === +id);

    return matchingUser;
  };

  const user = getUser(+userId);

  if (!user) {
    // Handle the case where no matching user is found
    return <span className="UserInfo">User not found</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
