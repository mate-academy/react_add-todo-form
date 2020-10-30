import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

export const AddForm = ({ value, changeHandler, clickHandler, users }) => (
  <div className="App__control">
    <Form.Label>
      Write your task
    </Form.Label>
    <Form.Control
      name="title"
      type="text"
      id="search-query"
      className="input"
      value={value}
      placeholder=""
      onChange={changeHandler}
    />
    <Form.Label>
      Select user
    </Form.Label>
    <Form.Control
      as="select"
      onChange={changeHandler}
      name="selected"
    >
      <option> </option>
      {users.map(user => (
        <option key={user.id} value={user.id - 1}>
          {user.name}
        </option>
      ))}
    </Form.Control>
    <Button
      variant="outline-success"
      onClick={clickHandler}
    >
      Submit
    </Button>
  </div>
);

AddForm.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
