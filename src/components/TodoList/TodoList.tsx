import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo [];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    <ul>
      <li style={{ listStyleType: 'none' }}>
        {todos.map(todo => (<TodoInfo key={todo.id} todo={todo} />))}
      </li>
    </ul>
  </section>
);
