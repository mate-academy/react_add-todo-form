import React from 'react';
import { SelectItem } from './SelectItem';
import { SelectShape } from '../../shapes/SelectShape';

export const Select = ({ value, usernameError, onChange, users }) => (
  <div className="field">
    <label htmlFor="username">
      User name:
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
      <p className="ui red pointing basic label">
        Please choose a user
      </p>
    )}
  </div>
);

Select.propTypes = SelectShape;
