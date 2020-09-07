import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ list }) => (
  <ul className="list">
    {list.map(item => (
      <Todo key={item.id} {...item} />
    ))}
  </ul>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
