import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, changeTodoStatus, deleteTask }) => (
  <>
    <ul>
      {todos.map(todo => (
        <Todo
          {...todo}
          key={todo.id}
          changeTodoStatus={changeTodoStatus}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  changeTodoStatus: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf.isRequired,
};
export default TodoList;
