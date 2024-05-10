import classNames from 'classnames';
import { UsersProps } from '../../types/User';

export const UserInfo = ({ user } : { user: UsersProps }) => (
  <a className={classNames('UserInfo')} href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
