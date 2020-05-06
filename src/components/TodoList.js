import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { TodoItem } from './TodoItem';

export const TodoList = ({ list }) => (

  <ul className="list">
    {list.map(item => <TodoItem {...item} key={item.id} />)}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
