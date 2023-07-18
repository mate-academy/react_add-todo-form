import React from 'react';
import { Todo } from '../../models/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => {
          return (
            <TodoInfo
              key={todo.id}
              todo={todo}
            />
          );
        })
      }
    </section>
  );
};
