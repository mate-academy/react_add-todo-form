import React from 'react';
import Proptypes from 'prop-types';
import { Select } from '../Select';
import { IsCompleted } from '../isCompleted';

export const Form = ({
  change,
  addTodo,
  value,
  person,
  length,
  onChange,
  isCompleted,
  inputError,
  selectError,
  callSelectError,
  callInputError,
}) => {
  const submit = (event) => {
    event.preventDefault();
    if (person === '') {
      callSelectError();
    }

    if (value === '') {
      callInputError();
    } else {
      addTodo({
        completed: isCompleted,
        user: person,
        title: value,
        id: length + 1,
      });
    }
  };

  return (
    <form
      className="form"
      onSubmit={submit}
    >
      <Select
        person={person}
        change={change}
        selectError={selectError}
      />
      <div className="title">
        <input
          className="text"
          type="text"
          name="title"
          placeholder="write here"
          value={value}
          onChange={onChange}
        />
        {inputError && <span style={{ color: 'red' }}>Write title</span>}
      </div>
      <IsCompleted
        isCompleted={isCompleted}
        change={change}
      />
      <button
        className="button"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

Form.propTypes = {
  change: Proptypes.func.isRequired,
  addTodo: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  callSelectError: Proptypes.func.isRequired,
  callInputError: Proptypes.func.isRequired,
  isCompleted: Proptypes.bool.isRequired,
  inputError: Proptypes.bool.isRequired,
  selectError: Proptypes.bool.isRequired,
  person: Proptypes.string.isRequired,
  length: Proptypes.number.isRequired,
  value: Proptypes.string.isRequired,
};
