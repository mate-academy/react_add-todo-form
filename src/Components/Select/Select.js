import React from 'react';
import PropTypes from 'prop-types';
import { Option } from '../Option/Option';

export const Select = ({ users, onChange, name, value }) => (
  <select
    value={value}
    name={name}
    onChange={({ target }) => {
      const option = users
        .find(user => user.userId === +target.value);

      onChange(target.name, option.userId);
    }}
  >
    <Option
      value=""
      text="Choose a user"
      disabled
    />
    {users.map(user => (
      <Option
        key={user.id}
        text={user.name}
        value={user.userId}
      />
    ))}
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
