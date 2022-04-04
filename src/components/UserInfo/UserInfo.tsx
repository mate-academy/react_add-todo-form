import './UserInfo.scss';
import { FC, memo } from 'react';
import { User } from '../../types/User';

interface Props {
  user: Omit<User, 'userId'>;
}

export const UserInfo: FC<Props> = memo(
  ({ user }) => {
    const { username, fullName, email } = user;

    return (
      <div className="
        UserInfo
        d-flex
        flex-column
        align-items-center
        "
      >
        <p
          className="UserInfo__name"
          title={`Username - ${username}`}
        >
          {fullName}
        </p>

        <a
          className="UserInfo__email"
          href={`mailto: ${email}`}
        >
          {email}
        </a>
      </div>
    );
  },
);
