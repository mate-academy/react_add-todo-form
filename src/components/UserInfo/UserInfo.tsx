import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h3 className="user__title">Info about user</h3>
    <ul className="user__list">
      <li className="user__item">
        {`Name: ${user.name}`}
      </li>

      <li className="user__item">
        {`E-mail: ${user.email}`}
      </li>
    </ul>
  </>
);
