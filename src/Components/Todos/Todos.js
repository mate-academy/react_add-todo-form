import React from 'react';
import { Todo } from '../Todo/Todo';
import { TodosShape } from '../../shapes/Shapes';

export const Todos = ({ todos }) => (
  <div>
    {
      todos.map(todo => <Todo content={todo} />)
    }
  </div>

);

Todos.propTypes = TodosShape.isRequired;
