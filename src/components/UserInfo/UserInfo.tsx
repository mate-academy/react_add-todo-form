import { User } from '../../react-app-env';

type Props = Pick<User, 'name' | 'username' | 'email'>;

export const UserInfo: React.FC<Props> = ({ name, username, email }) => (
  <>
    <td className="tbody__column">{name}</td>
    <td className="tbody__column">{username}</td>
    <td className="tbody__column">{email}</td>
  </>
);
