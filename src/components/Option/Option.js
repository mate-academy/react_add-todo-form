import React from 'react';
import PropTypes from 'prop-types';
import { OptionShape } from '../shapes/OptionShape';

import './Option.scss';

export const Option = ({ users }) => (
  <>
    {users.map(({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    ))}
  </>
);

Option.propTypes = {
  users: PropTypes.arrayOf(OptionShape).isRequired,
};
