import usersFromServer from '../../api/users';

interface UserInfoProps {
  userId: number;
}

export const UserInfo = ({ userId }: UserInfoProps) => {
  const user = usersFromServer.find((user) => user.id === userId);

  if (!user) {
    return <span className='error'>User not found</span>
  }

  return (
          <a className="UserInfo" href={`mailto:${user.email}`}>
            {user.name}
          </a>
  )
};
