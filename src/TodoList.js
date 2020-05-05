import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import Todo from './Todo';

const TodoList = ({ items }) => (
  <ol>
    {items.map(item => (
      <li key={item.id}>
        <Todo item={item} />
        <User item={item} />
      </li>
    ))
    }
  </ol>
);

TodoList.propTypes = {
  items: PropTypes.shape({
    map: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoList;
