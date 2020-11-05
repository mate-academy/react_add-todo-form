import React from 'react';
import PropTypes from 'prop-types';
import { Form, Container } from 'semantic-ui-react';

const TodoInput = ({ value, isTitleUndefined, handleChange }) => (
  <Container className="form__inner">
    {isTitleUndefined && (
      <span className="form__error">Please enter the title</span>
    )}
    <Form.Field
      control="input"
      name="title"
      placeholder="Add New Todo"
      onChange={handleChange}
      value={value}
    />
  </Container>
);

TodoInput.propTypes = {
  value: PropTypes.string.isRequired,
  isTitleUndefined: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TodoInput;
