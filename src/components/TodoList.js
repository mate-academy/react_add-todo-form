import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ tasks }) => (
  <ul>
    {tasks.map(task => (
      <TodoItem
        task={task}
        key={task.id}
        user={task.user}
      />
    ))}
  </ul>
);

TodoList.propTypes = {
  tasks: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
  })).isRequired,
};

export default TodoList;
