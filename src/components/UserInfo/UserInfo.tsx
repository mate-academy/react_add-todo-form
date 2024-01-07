import usersFromServer from '../../api/users';

interface Props {
  userId: number
}

export const UserInfo:React.FC<Props> = ({ userId }) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {usersFromServer.find(user => user.id === userId)?.name}
    </a>
  );
};
