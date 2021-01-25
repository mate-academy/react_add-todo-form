import React from 'react';
import { InputShape } from '../Shapes/InputShape';

export const Input = ({ value, titleError, onChange }) => (
  <div className="field">
    <label htmlFor="title">
      Task title:
    </label>

    <input
      type="text"
      name="title"
      id="title"
      placeholder="Write here"
      value={value}
      onChange={onChange}
    />

    {titleError && (
      <p className="ui pointing red basic label">
        Please enter the title
      </p>
    )}
  </div>
);

Input.propTypes = InputShape;
