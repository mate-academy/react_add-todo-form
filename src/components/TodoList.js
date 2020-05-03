import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, changeTodoStatus }) => (
  <>
    <ul>
      {todos.map(todo => (
        <Todo
          {...todo}
          key={todo.id}
          changeTodoStatus={changeTodoStatus}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  changeTodoStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
};
export default TodoList;
