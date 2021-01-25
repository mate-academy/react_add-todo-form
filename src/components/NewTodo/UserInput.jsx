import React from 'react';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';
import { UserPropTypes } from '../propTypes/UserPropTypes';

const UserInput = ({ userId, isUserUndefined, handleChange, users }) => (
  <Container className="form__inner">
    {isUserUndefined && (
      <span className="form__error">Please choose a user</span>
    )}
    <Form.Field
      control="select"
      name="userId"
      onChange={handleChange}
      value={userId}
    >
      <option value={0}>Choose a user</option>
      {users.map(({ name, id }) => (
        <option key={id} value={id}>
          {`${id}. ${name}`}
        </option>
      ))}
    </Form.Field>
  </Container>
);

UserInput.propTypes = {
  userId: PropTypes.number.isRequired,
  isUserUndefined: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserPropTypes)).isRequired,
};

export default UserInput;
