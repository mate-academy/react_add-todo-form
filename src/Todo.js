import React from 'react';
import propTypes from 'prop-types';
import User from './User';

const Todo = ({ todo }) => (
  <tr className="table-list--row">
    <th>{todo.id}</th>
    <th>{todo.title}</th>
    <th>{todo.completed ? 'x' : ''}</th>
    <th>
      <User key={todo.user.id} user={todo.user} />
    </th>
  </tr>
);

Todo.propTypes = {
  todo: propTypes.shape({
    id: propTypes.number,
    userId: propTypes.number,
    title: propTypes.string,
    completed: propTypes.bool,
    user: propTypes.object,
  }).isRequired,
};

export default Todo;
