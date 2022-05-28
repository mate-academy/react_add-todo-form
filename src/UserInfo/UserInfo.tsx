import React from 'react';
import '../style/ToDoListStyles.scss';

type Props = {
  name: string;
  username: string;
  email: string;
};

const UserInfo: React.FC<Props>
  = ({
    name,
    username,
    email,
  }) => {
    return (
      <ul className="ul_reset">
        <li>
          Name:
          {name}
        </li>
        <li>
          User Name:
          {username}
        </li>
        <li>
          Email:
          {email}
        </li>
      </ul>
    );
  };

export default UserInfo;
