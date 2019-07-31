import React from 'react';
import propTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = props => (
  <table>
    <tbody>
      {props.todos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} id={index + 1} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object).isRequired,
};

export default TodoList;
