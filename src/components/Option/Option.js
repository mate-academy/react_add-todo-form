import React from 'react';
import { OptionShape } from './OptionShape';

export const Option = ({ users }) => (
  <>
    <option value="">
      Choose a user
    </option>
    {users.map(person => (
      <option key={person.id}>
        {person.name}
      </option>
    ))}
  </>
);

Option.propTypes = OptionShape;
