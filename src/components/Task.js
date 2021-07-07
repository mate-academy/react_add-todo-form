import React from 'react';
import { TodoShape } from './Shapes';

export const Task = ({ title, userId }) => (
  <div>
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
