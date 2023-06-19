import { FC } from 'react';
import { Link, Typography } from '@mui/material';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { email, name } = user;

  return (
    <Typography variant="body1" component="div" className="UserInfo">
      <Link href={`mailto:${email}`} color="inherit">
        {name}
      </Link>
    </Typography>
  );
};
