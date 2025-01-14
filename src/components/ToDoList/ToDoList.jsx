import React from 'react';
import PropTypes from 'prop-types';
import { ToDo } from '../ToDo';
import { ToDoPropTypes } from '../../PropTypes/ToDoPropTypes';
import './todos.scss';

export const ToDoList = ({ todos }) => (
  <ul className="app__todos todos">
    {
      todos.map(todo => (
        <li key={todo.id} className="todos__todo">
          <ToDo {...todo} />
        </li>
      ))
    }
  </ul>
);

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(ToDoPropTypes).isRequired,
  ).isRequired,
};
