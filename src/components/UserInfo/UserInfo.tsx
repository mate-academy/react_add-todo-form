import { User } from '../../types';

type Proprs = {
  user?: User;
};

export const UserInfo: React.FC<Proprs> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email || ''}`}>
      {user?.name || 'Unknown user'}
    </a>
  );
};
