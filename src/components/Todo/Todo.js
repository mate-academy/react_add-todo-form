import React from 'react';
import { TodoShapes } from '../../Shapes';

export const Todo = ({ todo }) => (
  <>
    <td><input type="checkbox" checked={todo.completed} readOnly /></td>
    <td>{ todo.title }</td>
    <td>{ todo.userId }</td>
  </>
);

Todo.propTypes = {
  todo: TodoShapes.isRequired,
};
