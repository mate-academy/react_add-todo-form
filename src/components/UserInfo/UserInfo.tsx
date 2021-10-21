import React from 'react';
import './UserInfo.scss';

type Props = {
  name: string;
  username: string;
  email: string;
  phone: string;
  company: {
    name: string;
    catchPhrase: string;
  }
};

export const UserInfo: React.FC<Props> = (({
  name,
  username,
  email,
  phone,
  company,
}) => (
  <div className="item__user user">
    <div className="user__info info">
      <h2 className="info__title">User:</h2>
      <div className="info__description">
        <div className="user__avatar" />
        <div className="info__details">
          <p className="info__name">
            <strong>name: </strong>
            {name}
          </p>
          <p className="info__username">
            <strong>username: </strong>
            {username}
          </p>
          <p className="info__email">
            <strong>email: </strong>
            {email}
          </p>
          <p className="info__phone">
            <strong>phone: </strong>
            {phone}
          </p>
        </div>
      </div>

    </div>
    <div className="user__company company">
      <h2 className="company__title">
        {'User\'s company:'}
      </h2>
      <div className="company__info">
        <p className="company__info--name">
          <strong>name: </strong>
          {company.name}
        </p>
        <p className="company__info--catchPhrase">
          <strong>catch phrase: </strong>
          {company.catchPhrase}
        </p>
      </div>
    </div>
  </div>
));
