import React from 'react';
import Proptypes from 'prop-types';
import { Options } from '../Options';

export const Select = ({ person, change }) => (

  <select
    className="select"
    name="user"
    value={person}
    onChange={change}
  >
    <option value="">
      Choose a user
    </option>
    <Options />
  </select>
);

Select.propTypes = {
  person: Proptypes.string.isRequired,
  change: Proptypes.func.isRequired,
};
