/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ToDoItem from '../ToDoItem/ToDoItem';
import './TodoList.scss';

const TodoList = ({ preparedToDos }) => (
  <section className="container">
    {preparedToDos.map(todo => <ToDoItem todo={todo} key={todo.id} />)}
  </section>
);

TodoList.propTypes = {
  preparedToDos: PropTypes.arrayOf().isRequired,
};

export default TodoList;
