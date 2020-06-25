import React from 'react';
import { Option } from './Option';
import { ShapeSelect } from '../Shapes/Shapes';
import './Select.css';

export const Select = props => (
  <select
    className="Select"
    value={props.selected}
    onChange={ev => props.toSelect(ev)}
  >
    <option>{(props.selected)}</option>
    {
      props.users.map(user => <Option key={user.id} name={user.name} />)
    }
  </select>
);

Select.propTypes = ShapeSelect.isRequired;
