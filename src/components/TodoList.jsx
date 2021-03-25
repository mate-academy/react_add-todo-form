import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

function TodoList({ list }) {
  return (
    <>
      <ul className="todos__list">
        {list.map(item => (
          <li className="todos__item" key={item.id}>
            <Todo {...item} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
