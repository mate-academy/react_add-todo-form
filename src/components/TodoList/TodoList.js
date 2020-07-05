import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.css';
import { TodoListShape } from './TodoListShape';

export function TodoList(props) {
  const { todolist } = props;

  return (
    <>
      <h1>Static list of todos</h1>
      <span>Todos: </span>
      {todolist.length}
      <ul className="tasks">
        {todolist.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

TodoList.propTypes = TodoListShape;
