import React from 'react';
import { TodoFormInputShape } from '../../shapes/TodoFormInputShape';

export const TodoFormInput = ({ title, handleChange, errorText }) => (
  <>
    <label htmlFor="name">
      <input
        type="text"
        id="name"
        name="title"
        className="form__input"
        placeholder="Enter todo"
        value={title}
        onChange={handleChange}
      />
    </label>
    <p className="form__error">
      {errorText}
    </p>
  </>
);

TodoFormInput.propTypes = TodoFormInputShape;
