import { User } from '../../Types';

import './UserInfo.scss';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="UserInfo">
    <div className="UserInfo__name">
      {(user) ? user.name : 'No info'}
    </div>
    <a href={`mailto:${(user) ? user.email : 'No info'}`} className="UserInfo__email">
      {(user) ? (user.email) : 'No info'}
    </a>
  </div>
);
