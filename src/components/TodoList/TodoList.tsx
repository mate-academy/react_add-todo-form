import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Todos = {
  todos: Todo[]
};

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => (
          <TodoInfo
            key={todo.id}
            title={todo.title}
            user={todo.user}
            completed={todo.completed}
            id={todo.id}
            userId={todo.userId}
          />
        ))
      }
    </section>
  );
};
