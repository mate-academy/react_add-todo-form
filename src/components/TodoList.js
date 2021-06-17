import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ todos }) {
  return (
    <>
      <ul>
        {todos.map(todoObj => (
          <Todo key={todoObj.id} todos={todoObj} />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
