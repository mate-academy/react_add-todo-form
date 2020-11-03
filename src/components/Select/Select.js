import React from 'react';
import { SelectShape } from './SelectShape';
import { Option } from '../Option';

export const Select = ({ name, callback, error, users }) => (
  <p>
    <span>
      {` for user `}
    </span>
    <label>
      <select
        className="App__select"
        name="name"
        value={name}
        onChange={callback}
      >
        <Option users={users} />
      </select>
    </label>
    <div className="App__error">
      {error}
    </div>
  </p>
);

Select.propTypes = SelectShape;
