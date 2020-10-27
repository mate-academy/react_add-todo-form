import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import { TodoShape } from '../shapes/TodoShape';

export const TodoList = ({ src }) => (
  <>
    {
      src.map(task => (
        <Todo {...task} key={task.id} />
      ))
    }
  </>
);

TodoList.propTypes = {
  src: PropTypes.arrayOf(TodoShape).isRequired,
};
