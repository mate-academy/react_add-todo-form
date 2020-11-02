import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { Select } from '../Select';

export const AddForm = (
  { value,
    selected,
    btnStatus,
    changeHandler,
    clickHandler,
    users },
) => (
  <div className="App__control">
    <Form.Label
      className={value === '' && btnStatus ? 'App__red' : ''}
    >
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
    <Form.Label
      className={selected === '0' && btnStatus ? 'App__red' : ''}
    >
      Select user
    </Form.Label>
    <Select
      users={users}
      changeHandler={changeHandler}
    />
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
  selected: PropTypes.string.isRequired,
  btnStatus: PropTypes.bool.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
