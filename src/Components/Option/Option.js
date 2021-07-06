import React from 'react';
import { OptionShape } from '../../Shapes/OptionShape';

export const Option = ({ preparedUsers }) => (
  <>
    <option value="Choose a user">
      Choose a user
    </option>
    {preparedUsers.map(user => (
      <option
        key={user}
        value={user}
      >
        {user}
      </option>
    ))}
  </>
);

Option.propTypes = OptionShape;
