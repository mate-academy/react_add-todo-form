import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

// Add the required types and props
type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <div className="list">
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      </div>

    ))}
  </section>
);
