import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ preparedTodos }) => (
  <div className="todos">
    {preparedTodos.map(todo => <TodoItem todo={todo} />)}
  </div>
);

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(shape).isRequired,
};

export default TodoList;
