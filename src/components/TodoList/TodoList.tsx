import React from 'react';
import { Todo } from '../../types/type';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.css';

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
