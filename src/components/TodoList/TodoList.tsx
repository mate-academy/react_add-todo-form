import React from 'react';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';
import { Props } from './TodoList.types';

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="TodoList-container">
    <section className="TodoList section">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  </div>
);
