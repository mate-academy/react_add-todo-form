import React from 'react';
import { SelectItem } from '../SelectItem';
import { SelectShape } from '../Shapes/SelectShape';

export const Select = ({ value, usernameError, onChange, users }) => (
  <div className="field">
    <label htmlFor="username">
      User:
    </label>

    <select
      name="username"
      id="username"
      value={value}
      onChange={onChange}
    >
      <SelectItem
        users={users}
      />
    </select>

    {usernameError && (
      <p className="ui pointing red basic label">
        Please choose a user
      </p>
    )}
  </div>
);

Select.propTypes = SelectShape;
