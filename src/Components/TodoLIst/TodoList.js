import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ listTodos }) => (
  <div className="list">
    {listTodos.map(todo => <TodoItem key={todo.id} {...todo} />)}
  </div>
);

TodoList.propTypes = {
  listTodos: PropTypes.arrayOf(PropTypes.objectOf({
    key: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.objectOf({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
    }),
  })).isRequired,
};

export default TodoList;
