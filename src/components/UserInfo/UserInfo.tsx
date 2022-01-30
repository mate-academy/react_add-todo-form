import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({
  name,
  username,
  email,
  phone,
  address,
  company,
}) => (
  <div className="UserInfo">
    <h2
      className="UserInfo__title"
    >
      {name}
      {username}
    </h2>

    <a
      className="UserInfo__email"
      href={`mailto:${email}`}
    >
      {email}
    </a>
    <p className="UserInfo__phone">
      {'phone: '}
      {phone}
    </p>
    <p className="UserInfo__address">
      {'address.geo.lat: '}
      {address.geo.lat}
    </p>
    <p className="UserInfo__catchPhrase">
      {'company.catchPhrase: '}
      {company.catchPhrase}
    </p>
  </div>
);
