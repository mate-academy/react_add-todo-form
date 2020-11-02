import React from 'react';
import PropTypes from 'prop-types';

import { Option } from '../Option';
import { OptionShape } from '../shapes/OptionShape';

import './Select.scss';

export const Select = ({ users, selectedUser, selectUser }) => (
  <select
    className="form-control"
    id="usersSelector"
    value={selectedUser}
    onChange={selectUser}
  >
    <option value="">
      Choose a user
    </option>

    <Option users={users} />
  </select>
);

Select.propTypes = {
  users: PropTypes.arrayOf(OptionShape).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
};
