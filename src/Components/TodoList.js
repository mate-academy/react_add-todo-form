import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoList.scss';

const TodoList = ({ todoList }) => (
  <div className="todo__list">
    {todoList.map(todo => (

      <TodoItem todo={todo} key={todo.id} />

    ))}
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
