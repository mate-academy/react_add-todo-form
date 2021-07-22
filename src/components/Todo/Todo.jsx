import React from 'react';
import { User } from '../User';
import { TodoShape } from '../../types';

export const Todo = ({ todo }) => (
  <>
    <td className="table-info">{todo.id}</td>
    <td className="table-light">{todo.title}</td>
    <td className={todo.completed ? 'table-success' : 'table-danger'}>
      {todo.completed ? 'Completed.' : 'Is not completed yet.'}
    </td>
    <User currentUser={todo.user.name} />
  </>
);

Todo.propTypes = {
  todo: TodoShape.isRequired,
};
