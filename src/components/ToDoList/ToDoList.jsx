import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';
import { ToDo } from '../ToDo';
import { TodoType } from '../../types';

export function ToDoList({ listOfTodos }) {
  return (
    <div className="todo-list">
      <h2>To Do List:</h2>
      <ol>
        {listOfTodos.map(todo => (
          <li key={todo.id}>
            <ToDo {...todo} />
          </li>
        ))}
      </ol>
    </div>
  );
}

ToDoList.propTypes = {
  listOfTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      todo: PropTypes.arrayOf(
        TodoType,
      ),
    }),
  ),
};

ToDoList.defaultProps = {
  listOfTodos: [],
};
