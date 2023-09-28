import { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  return <option value={user.id}>{user.name}</option>;
};
