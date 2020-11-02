import React from 'react';
import PropTypes from 'prop-types';
import { Options } from '../Options/Options';
import { UserShape } from '../shapes/UserShape';

export const Select = ({ users, value, chooseUser }) => (
  <select
    className="form__select"
    value={value}
    onChange={chooseUser}
  >
    <Options users={users} />
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  value: PropTypes.string.isRequired,
  chooseUser: PropTypes.func.isRequired,
};
