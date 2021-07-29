import React from 'react';
import PropTypes from 'prop-types';
import { PreparedTodosType } from '../../types/PreparedTodosTypes';
import { Todo } from '../Todo';
import './TodoList.css';

export const TodoList = ({ preparedTodos }) => (
  <ul className="todoList">
    {
      preparedTodos.map(task => (
        <li key={task.id} className="taskCard">
          <Todo task={task} />
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = PropTypes.arrayOf(PreparedTodosType).isRequired;
