import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TodoItem = ({ task, user }) => (
  <li
    key={task.id}
  >
    <div className={classnames('task', {
      completed: task.completed, uncompleted: !task.completed,
    })}
    >
      <div>{`Actual status: ${task.completed ? 'Done' : 'Not yet'}`}</div>
      <div>{`Task: ${task.title}`}</div>
      <div>{`Maintainer: ${user.name}`}</div>
    </div>
  </li>
);

TodoItem.propTypes = {
  user: propTypes.objectOf(propTypes.shape({
    name: propTypes.string.isRequired,
  })).isRequired,
  task: propTypes.arrayOf(propTypes.shape({
    completed: propTypes.bool.isRequired,
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
  })).isRequired,
};

export default TodoItem;
