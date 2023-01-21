import { FC } from 'react';
import { Link } from '@mui/material';
import { User } from '../../types/User';

interface Props {
  user: User
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <Link href={`mailto:${email}`} variant="body2" underline="hover">
      {name}
    </Link>
  );
};
