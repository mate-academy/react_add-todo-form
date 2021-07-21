import React from 'react';
import PropTypes from 'prop-types';
import { InputForTitle } from './InputForTitle';
import { AddButton } from './AddButton';
import { SelectUser } from './SelectUser';
import './FormToAddTodo.css';

export const FormToAddTodo = ({
  onSubmit,
  onChangeForInput,
  onChangeForSelect,
  namesForOptions,
  valueForInput,
  valueForSelect,
}) => (
  <form
    className="add-form"
    onSubmit={onSubmit}
  >
    <InputForTitle
      onChange={onChangeForInput}
      value={valueForInput}
    />
    <SelectUser
      valueForSelect={valueForSelect}
      namesForOptions={namesForOptions}
      onChange={onChangeForSelect}
    />
    <AddButton />
  </form>
);

FormToAddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeForInput: PropTypes.func.isRequired,
  onChangeForSelect: PropTypes.func.isRequired,
  namesForOptions:
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  valueForInput: PropTypes.string.isRequired,
  valueForSelect: PropTypes.string.isRequired,
};
