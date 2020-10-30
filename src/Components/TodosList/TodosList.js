import React from 'react';
import { Todo } from '../Todo';
import { TodosListShape } from '../../Shapes/TodosListShape';
import './TodosList.css';

export const TodosList = ({ todosList }) => (
  <ul className="todosList">
    {todosList.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
      />
    ))}
  </ul>
);

TodosList.propTypes = TodosListShape;
