import React from 'react';
import PropTypes from 'prop-types';
import './userlist.css';

const UsersList = ({ usersList: user }) => (
  <div>
    <div>
      <p>
        <i className="fas fa-user-tie" />
        {' '}
        <span className="info">{user.name}</span>
      </p>
      <p>

        Username:
        <span className="info">{user.username}</span>
      </p>
      <p className="info phone">
        <i className="fas fa-phone-square" />
        {' '}
        <span>{user.phone}</span>
      </p>
    </div>
    <div className="card-action">
      <p>
        <i className="fas fa-envelope-open-text" />
        {' '}
        {user.email}
      </p>
      <p>
        <i className="fab fa-chrome" />
        {' '}
        {user.website}
      </p>
    </div>
  </div>

);

UsersList.propTypes = { usersList: PropTypes.arrayOf(PropTypes).isRequired };

export default UsersList;
