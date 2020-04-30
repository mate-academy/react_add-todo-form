import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = ({ todoList, setTodoStatus, deleteTodo }) => (
  <>
    <h1>Static list of todos</h1>
    <ul className="todo todo__list">
      {todoList.map((todo, index) => (
        <TodoItem
          {...todo}
          index={index + 1}
          setTodoStatus={setTodoStatus}
          deleteTodo={deleteTodo}
          key={todo.id}
        />
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  setTodoStatus: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
