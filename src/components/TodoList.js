import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = (props) => {
  const todos = props.todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      handleTogle={props.handleTogle}
    />
  ));

  return (
    <table className="todos-table">
      <tbody>
        {todos}
      </tbody>
    </table>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleTogle: PropTypes.func.isRequired,
};

export default TodoList;
