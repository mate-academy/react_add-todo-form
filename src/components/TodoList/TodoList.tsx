import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = (props) => {
  return (
    <section className="TodoList">
      {props.todos.map(todo => {
        return (
          <TodoInfo
            key={todo.id}
            todo={todo}
          />
        );
      })}
    </section>
  );
};
