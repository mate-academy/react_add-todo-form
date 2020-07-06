import React from 'react';
import PropTypes from 'prop-types';
import { Option } from '../Option/Option';

export const Select = ({ users }) => (
  <select defaultValue="0" name="users">
    <Option
      text="Choose a user"
      value="0"
    />
    {users.map(user => <Option key={user.id} text={user.name} />)}
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};
