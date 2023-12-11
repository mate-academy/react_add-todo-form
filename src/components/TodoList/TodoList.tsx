import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
