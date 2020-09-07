import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './TodoList.css';

const TodoList = ({ list, users }) => (
  <div className="todo-list">
    {list.map(item => (
      <Todo {...item} key={item.id} users={users} />
    ))}
  </div>
);

export default TodoList;

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
