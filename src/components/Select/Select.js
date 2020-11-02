import React from 'react';
import PropTypes from 'prop-types';
import { Option } from '../Option/Option';

export const Select = ({ users, user, chooseUser }) => (
  <select
    className="form__select"
    value={user.name}
    onChange={chooseUser}
  >
    <Option users={users} />
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  chooseUser: PropTypes.func.isRequired,
};
