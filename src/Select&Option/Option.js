import React from 'react';
import { ShapeOption } from '../Shapes/Shapes';

export const Option = props => (
  <option>{(props.name)}</option>
);

Option.propTypes = ShapeOption.isRequired;
