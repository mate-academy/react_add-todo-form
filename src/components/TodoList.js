import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ list }) => (
  <table>
    <thead>
      <tr>
        <th>Todo ID</th>
        <th>Description</th>
        <th>Is completed?</th>
        <th>Responsible person</th>
        <th>User ID</th>
      </tr>
    </thead>
    <tbody>
      {list.map(todo => <TodoItem key={todo.id} item={todo} />)}
    </tbody>
  </table>
);

TodoList.propTypes = { list: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;
