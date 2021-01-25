import React from 'react';
import { SelectUser } from '../SelectUser';
import { SelectShape } from '../../shapes/SelectShape';

export const Select = ({ name, handleChange, users, errorSelect }) => (
  <>
    <select
      name="name"
      className="form__select-user"
      value={name}
      onChange={handleChange}
    >
      <option value="">Select user</option>
      {users.map(user => (
        <SelectUser key={user.id} name={user.name} />
      ))}
    </select>
    <p className="form__error">
      {errorSelect}
    </p>
  </>
);

Select.propTypes = SelectShape;
