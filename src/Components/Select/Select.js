import React from 'react';
import PropTypes from 'prop-types';
import { Option } from '../Option/Option';

export const Select = ({ users, onChange, name }) => (
  <select
    defaultValue="0"
    name={name}
    onChange={({ target }) => {
      const option = users
        .find(user => user.name === target.value);

      onChange(target.name, option.userId);
    }}
  >
    <Option
      text="Choose a user"
      value="0"
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
};
