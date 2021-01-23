import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import { TodoShape } from '../shapes/TodoShape';

export const TodoList = ({ tasksList }) => (
  <>
    {
      tasksList.map(task => (
        <Todo {...task} key={task.id} />
      ))
    }
  </>
);

TodoList.propTypes = {
  tasksList: PropTypes.arrayOf(TodoShape).isRequired,
};
