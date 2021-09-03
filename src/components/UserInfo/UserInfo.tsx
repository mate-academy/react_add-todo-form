import React from 'react';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;
  const { name, email } = user;

  return (
    <div className="badge badge-primary">
      {`Responsible: ${name}. Email: ${email}`}
    </div>
  );
};
