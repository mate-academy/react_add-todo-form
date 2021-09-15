import React from 'react';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section>
      <ul className="todo__list">
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
