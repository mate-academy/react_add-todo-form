import React from 'react';
import { getUserById } from '../../services/helpers';
import { Todo } from '../../services/todo'
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          user={getUserById(todo.userId)}
          key={todo.id}
        />
      ))}
    </section>
  );
};
