import React from 'react';
import { Option } from './Option';
import { ShapeSelect } from '../Shapes/Shapes';
import './Select.css';

export const Select = props => (
  <select
    required
    className="Select"
    value={props.selected}
    defaultValue="0"
    onChange={ev => props.toSelect(ev.target.value)}
  >
    <option value="0" disabled>Select user</option>
    {
      props.users.map(user => <Option key={user.id} name={user.name} />)
    }
  </select>
);

Select.propTypes = ShapeSelect.isRequired;
