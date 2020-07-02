import React from 'react';
import { SelectionShapes } from '../../Shapes';

export const Selection = ({ flag, change, users }) => (
  <div className="form-group">
    <select
      className={`form-control ${flag ? 'is-invalid' : ''}`}
      id="exampleSelect1"
      onChange={event => change(event.target.value)}
    >
      <option value="">Choose a user</option>
      {users.map(user => (
        <option value={user.id} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
    <div
      className="invalid-feedback"
    >
      Please, choose a user
    </div>
  </div>
);

Selection.propTypes = SelectionShapes.isRequired;
