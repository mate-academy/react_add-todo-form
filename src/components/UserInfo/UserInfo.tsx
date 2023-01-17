import { FC } from 'react';
import { User } from '../../types/Users';

type Props = {
  user: User,
};

export const UserInfo: FC<Props> = (props) => {
  const {
    user: {
      name,
      email,
    },
  } = props;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
