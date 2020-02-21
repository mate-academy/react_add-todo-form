import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => {
  console.log(todos);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Todo</th>
          <th>Status</th>
          <th>User Id</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(item => <Todo key={item.id} {...item} />)}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
