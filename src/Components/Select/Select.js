import React from 'react';
import PropTypes from 'prop-types';
import { Option } from '../Option/Option';
import { NameShape, ValueShape } from '../../shapes/Shapes';

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
        key={user.userId}
        text={user.name}
        value={user.userId}
      />
    ))}
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(NameShape).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: ValueShape.isRequired,
};
