import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ list }) => (
  list.map(item => (
    <div key={item.id}>
      <h1>{`${item.title}`}</h1>
      <p>{item.user.name}</p>
      <p>{item.completed ? 'completed' : 'not completed'}</p>
    </div>
  ))
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default TodoList;
