import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const Select = ({ users, changeHandler }) => (
  <Form.Control
    as="select"
    onChange={changeHandler}
    name="selected"
  >
    <option value={0}> </option>
    {users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ))}
  </Form.Control>
);

Select.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeHandler: PropTypes.func.isRequired,
};
