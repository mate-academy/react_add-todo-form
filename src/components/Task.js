import React from 'react';
import { TodoShape } from './Shapes';

export const Task = ({ id, title, userId }) => (
  <div key={id}>
    <div>
      {title}
      <input type="checkbox" />
      <span>
        UserId:
        {userId}
      </span>
    </div>
  </div>
);

Task.propTypes = TodoShape.isRequired;
