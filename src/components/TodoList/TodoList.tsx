import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul>
        {todos.map(todo => (
          <li>
            <TodoInfo key={todo.id} todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
