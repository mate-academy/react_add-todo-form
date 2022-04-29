import React from 'react';
import './UserInfo.scss';

type Props = {
  name: string,
  email: string,
  phone: string,
  website: string,
};

export const UserInfo: React.FC<Props> = ({
  name,
  email,
  phone,
  website,
}) => (
  <>
    <h3 className="user-name">{name}</h3>
    <br />
    <div className="user-email">{email}</div>
    <div className="user-phone">{phone}</div>
    <div className="user-website">{website}</div>
  </>
);
