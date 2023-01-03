import React from 'react';
import { Todo } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const {
          id,
          completed,
        } = todo;

        return (
          <article
            data-id={id}
            className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
            key={id}
          >
            <TodoInfo todo={todo} />
          </article>
        );
      })}
    </section>
  );
};
