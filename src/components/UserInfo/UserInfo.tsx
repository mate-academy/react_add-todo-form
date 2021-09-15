import React from 'react';
import './UserInfo.scss';

type Props = {
  person: {
    name: string,
    username: string,
    email: string,
  },
};

export const UserInfo: React.FC<Props> = (props) => {
  const { name, email } = props.person;

  return (
    <div className="userInfo">
      <p className="userInfo__name">{name}</p>
      <span className="userInfo__contact">
        {'Contact: '}
        {email}
      </span>
    </div>
  );
};
