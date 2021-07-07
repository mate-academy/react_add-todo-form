import React from 'react';
import { Todo } from '../Todo';

export const Todos = ({ todos }) => (
  todos.map(todo => <Todo todo={todo} />)
);
