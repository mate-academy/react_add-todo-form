import React from 'react';
import { TodoShape } from '../../shapes/TodoShape';

export const Todo = ({ name, title }) => (
  <>
    <div className="todo-container__todo">
      {name}
      {':  '}
      {title}
    </div>
  </>
);

Todo.propTypes = TodoShape;
