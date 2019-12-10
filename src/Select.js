import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ defaultOption, handleSelectChange, users, error }) => (
  <label htmlFor="select">
    UserName:
    <select value={defaultOption} onChange={handleSelectChange} id="select">
      <option disabled hidden value={0}>Choose a user</option>
      {users.map((user, i) => (
        <option key={user.name} value={i + 1}>{user.name}</option>
      ))}
    </select>
    {error ? (<p className="error">Please choose a user</p>) : ''}
  </label>
);

Select.propTypes = {
  defaultOption: PropTypes.number.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.bool.isRequired,
};

export default Select;
