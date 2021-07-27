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
}) => (
  <form
    className="form"
    onSubmit={(event) => {
      event.preventDefault();
      addTodo({
        completed: isCompleted,
        user: person,
        title: value,
        id: length + 1,
      });
    }}
  >
    <Select
      person={person}
      change={change}
    />
    <input
      className="title"
      type="text"
      name="title"
      placeholder="write here"
      value={value}
      onChange={onChange}
    />
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

Form.propTypes = {
  change: Proptypes.func.isRequired,
  addTodo: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  isCompleted: Proptypes.bool.isRequired,
  person: Proptypes.string.isRequired,
  length: Proptypes.number.isRequired,
  value: Proptypes.string.isRequired,
};
