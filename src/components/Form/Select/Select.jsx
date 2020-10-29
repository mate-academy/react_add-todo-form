import React from 'react';
import PropTypes from 'prop-types';
import UserShape from '../../../shapes/UserShape';

const Select = ({ users, user, getValue }) => (
  <>
    <select
      value={user}
      className="form__select"
      name="user"
      onChange={getValue}
    >
      <option value="">Choose a User</option>
      {users.map(person => (
        <option value={person.name} key={person.id}>
          {person.name}
        </option>
      ))}
    </select>
  </>
);

Select.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  getValue: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default React.memo(Select);
