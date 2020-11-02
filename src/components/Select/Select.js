import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import { Option } from '../Option/Option';

import './Select.scss';

export const Select = ({ name, value, onChange }) => (
  <label htmlFor={name}>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="select"
    >
      <Option
        id={0}
        name="Choose user"
      />
      {users.map(({ name: userName, id }) => (
        <Option
          key={id}
          id={id}
          name={userName}
        />
      ))}
    </select>
  </label>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
