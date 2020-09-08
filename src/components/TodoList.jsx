import React from 'react';
import { Todo } from './Todo';
import { TodoListShape } from './Shape';
import './TodoList.css';

export const TodoList = ({ list }) => (
  <>
    <div className="filters">
      <p>#</p>
      <p>Name</p>
      <p>Task</p>
      <p>Status</p>
    </div>
    <ul className="list">
      {list.map(item => <Todo key={item.id} {...item} />)}
    </ul>
  </>
);

TodoList.propTypes = TodoListShape.isRequired;
