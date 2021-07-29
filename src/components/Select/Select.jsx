import React from 'react';
import Proptypes from 'prop-types';
import { Options } from '../Options';

export const Select = ({ person, change, selectError }) => (
  <div className="selector">
    <select
      className="select"
      name="user"
      value={person}
      onChange={change}
    >
      <option value="">
        Choose a user
      </option>
      <Options selectError={selectError} />
    </select>
    {selectError && <span style={{ color: 'red' }}>Choose a user</span>}
  </div>
);

Select.propTypes = {
  person: Proptypes.string.isRequired,
  selectError: Proptypes.bool.isRequired,
  change: Proptypes.func.isRequired,
};
