import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ list }) => (
  <table align="center">
    <thead>
      <tr>
        <th>title</th>
        <th>completed</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map(item => <TodoItem todo={item} key={item.id} />)
      }
    </tbody>
  </table>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
