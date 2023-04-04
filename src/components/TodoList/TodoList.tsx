import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const myStyle = {
    listStyleType: 'none',
  };

  return (
    <section className="TodoList">
      <ul style={myStyle}>
        {todos && todos.map((todo) => (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </section>
  );
};
