import React from 'react';
import './TodoList.scss';
import TodoItem from '../TodoItem/TodoItem';
import { TodoListTypes } from '../../constants/proptypes';

function TodoList({ listOfTodo }) {
  return (
    <div className="todolist">
      {listOfTodo.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </div>
  );
}

TodoList.propTypes = TodoListTypes;

export default TodoList;
