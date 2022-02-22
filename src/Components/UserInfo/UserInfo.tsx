import { User } from '../../Types/User';

type Props = User;

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <p className="user__name">
      Name:
      {' '}
      {name}
    </p>
    <p className="user__email">
      E-mail:
      {' '}
      {email}
    </p>
  </>
);
