import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.css';
import { Todo } from '../../type/types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="Todo-list">
    {todos.map(todo => (
      <div key={todo.id} className="Todo-list__item">
        <TodoInfo todo={todo} />
      </div>
    ))}
  </div>
);
