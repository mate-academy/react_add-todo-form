import { User } from '../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h4 className="user__title">Info about user</h4>
    <ul className="user__list">
      <li className="user__item">
        {`Name: ${user.name}`}
      </li>

      <li className="user__item">
        {`E-mail: ${user.email}`}
      </li>

      <li className="user__item">
        {`Phone: ${user.phone}`}
      </li>
    </ul>
  </>
);
