import usersFromServer from '../../api/users';
import { getUser } from '../../helperFunctions/getUser';

interface Props {
  userId: number;
}

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const foundedUser = getUser(userId, usersFromServer);

  return (
    <a className="UserInfo" href={`mailto:${foundedUser?.email}`}>
      {foundedUser?.name}
    </a>
  );
};
