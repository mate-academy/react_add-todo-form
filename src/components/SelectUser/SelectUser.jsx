import React from 'react';
import { SelectUserShape } from '../../shapes/SelectUserShape';

export const SelectUser = ({ name }) => (
  <option>
    {name}
  </option>
);

SelectUser.propTypes = SelectUserShape;
