import React from 'react';
import PropTypes from 'prop-types';

const UserSelector = ({ users, userId, handler }) => {
  return (
    <>
      <label>Choose User</label>
        <select className="ui fluid dropdown" name="userId"
            value={userId}
            onChange={handler}>
          <option value={0}>
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
    </>
  );
};

UserSelector.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
      geo: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    }),
    phone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      catchPhrase: PropTypes.string.isRequired,
      bs: PropTypes.string.isRequired,
    }),
  }))
};

export default UserSelector;
