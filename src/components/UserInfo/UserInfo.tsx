import { FunctionComponent } from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User
};

export const UserInfo: FunctionComponent<Props> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
