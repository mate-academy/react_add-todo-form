import React from 'react';

type Props = {
  user: User
};

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="user">
      <div className="user__name">
        {user.name}
      </div>

      <div className="user__email">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
    </div>
  );
};

export default UserInfo;
