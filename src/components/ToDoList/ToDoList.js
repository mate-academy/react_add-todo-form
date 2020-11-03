import React from 'react';
import PropTypes from 'prop-types';
import { ToDo } from '../ToDo';
import { ToDoPropTypes } from '../PropTypes/ToDoPropTypes';
import './ToDoList.css';

export const ToDoList = ({ todos }) => (
  <ul className="container">
    {
      todos.map(todo => (
        <li key={todo.id} className="todo">
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
