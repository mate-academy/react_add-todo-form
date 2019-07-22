import React from 'react';
import PropTypes from 'prop-types';

const User = ({ currentUser }) => (
  <>
    <td className="todo-list-table__user-info">{ currentUser.name }</td>
    <td className="todo-list-table__user-info">{ currentUser.email }</td>
    <td className="todo-list-table__user-info">{ currentUser.phone }</td>
  </>
);

User.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default User;
