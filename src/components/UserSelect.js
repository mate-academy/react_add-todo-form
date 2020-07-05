import React from 'react';
import { UserShape } from './Shapes';

export const UserSelect = ({ value, userChosen, users }) => (
  <>
    <span className="user">Choose your user: </span>
    <select
      className="user__select"
      onChange={userChosen}
      value={value}
      required
    >
      <option value="" disabled>Choose one</option>
      {users.map(user => (
        <option value={user.name} key={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  </>
);

UserSelect.propTypes = UserShape;
