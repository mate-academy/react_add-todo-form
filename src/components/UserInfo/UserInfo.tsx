import usersFromServer from '../../api/users';

type Props = {
  userId: number,
};

export const UserInfo = ({ userId }: Props) => {
  const user = usersFromServer
    .find(curentUser => curentUser.id === userId);

  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
