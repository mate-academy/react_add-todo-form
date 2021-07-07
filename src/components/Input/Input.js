import React from 'react';
import { InputShape } from './InputShape';

export const Input = ({ title, callback, error }) => (
  <div>
    <label>
      <span>
        {`Task is `}
      </span>
      <input
        className="App__input"
        placeholder="write here"
        name="title"
        type="text"
        value={title}
        onChange={callback}
      />
    </label>
    <div className="App__error">
      {error}
    </div>
  </div>
);

Input.propTypes = InputShape;
