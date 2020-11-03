import React from 'react';
import { InputShape } from '../../Shapes/InputShape';

export const Input = ({
  enteredTodo,
  errorOnInput,
  handleChangeOnInput,
}) => (
  <>
    <label
      className="form__label"
      htmlFor="todo"
    >
      Task to do:
    </label>
    <input
      className="form__input"
      id="todo"
      type="text"
      name="enteredTodo"
      value={enteredTodo}
      onChange={handleChangeOnInput}
    />
    {errorOnInput
      && <div className="form__error">Please enter the title</div>}
  </>
);

Input.propTypes = InputShape;
