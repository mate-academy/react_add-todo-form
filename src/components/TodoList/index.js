import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';

const TodoList = ({ todos, handleCompleted }) => (
  todos.map(el => (
    <TodoItem handleCompleted={handleCompleted} key={el.id} {...el} />
  ))
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCompleted: PropTypes.func.isRequired,
};

export default TodoList;
