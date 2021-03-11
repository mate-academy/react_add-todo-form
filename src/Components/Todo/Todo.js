import React from 'react';
import { TodoShape } from '../../shapes/Shapes';

export const Todo = ({ content }) => {
  const { title, userId } = content;

  return (
    <div>
      <label>
        <input type="checkbox" />
        <span>{title}</span>
        <span>
          {` id${userId}`}
        </span>
      </label>
    </div>
  );
};

Todo.propTypes = TodoShape.isRequired;
