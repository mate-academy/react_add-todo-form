import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Tod';
import { TodoShape } from '../utils/Shapes';
import './TodoList.css';

export const TodoList = (props) => {
  const { tasks } = props;

  return (

    <div className="todoList">
      {tasks.map(task => (
        <Todo
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(TodoShape).isRequired,
};
