import React from 'react';
import PropTypes from 'prop-types';
import { Error } from './Error';
import { UserShape } from '../shapes/UserShape';
import { Option } from './Option';

export const Select = ({ userName, onChange, users, userError }) => (
  <div>
    <label>
      Assign to
      <select
        name="userName"
        value={userName}
        className="form-control"
        onChange={onChange}
      >
        <Option text="Choose a user" />

        {users.map(person => (
          <Option key={person.id} text={person.name} />
        ))}
      </select>
    </label>

    {userError
      ? <Error text="Please choose a user" />
      : ''}
  </div>
);

Select.propTypes = {
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
  userError: PropTypes.bool.isRequired,
};
