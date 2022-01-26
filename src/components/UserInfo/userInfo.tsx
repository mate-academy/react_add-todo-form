import React from 'react';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="has-text-right">
    <p className="title is-5">{user.username}</p>
    <p className="subtitle is-7">{`(${user.name})`}</p>
    <p className="subtitle is-6 is-italic">{user.email}</p>
  </div>
);
