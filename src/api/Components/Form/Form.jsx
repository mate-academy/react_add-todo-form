import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import Massege from '../Massege/Massege';
import users from '../../users';
import { FormPropTypes } from './FormPropTypes';

export const MainForm = (
  {
    onInputChange,
    onSelectChange,
    inputValue,
    selectValue,
    onClick,
    checkedLengthWord,
    isChoosen,
    titleLength,
  },
) => (
  <>
    <Form
      className="form"
      onSubmit={event => event.preventDefault()}
    >
      <div>
        <Form.Control
          maxLength="30"
          type="text"
          placeholder="Title (Max length : 30 characters)"
          onChange={onInputChange}
          value={inputValue}
        />
      </div>
      <Form.Select
        onChange={onSelectChange}
        value={selectValue}
      >
        <option>Choose name</option>
        {users.map(item => (
          <option
            key={item.id}
          >
            {item.name}
          </option>
        ))}
      </Form.Select>
      <div>
        <Button
          onClick={onClick}
          type="submit"
          variant="info"
          size="md"
          className="button"
        >
          Attempt
        </Button>
      </div>
      <Massege
        checkedLengthWord={checkedLengthWord}
        isChoosen={isChoosen}
        titleLength={titleLength}
      />
    </Form>
  </>
);

MainForm.propTypes = FormPropTypes;
