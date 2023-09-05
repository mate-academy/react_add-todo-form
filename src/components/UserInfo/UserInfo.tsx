import { User } from '../../types/types';

export const UserInfo: React.FC<{ user: User }>
  = ({ user: { email, name } }) => {
    return (
      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    );
  };
