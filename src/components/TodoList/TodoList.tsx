import React from 'react';

import { Todo } from '../../react-app-env';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => {
        return (
          <article data-id="1" className="TodoInfo TodoInfo--completed">
            <h2 className="TodoInfo__title">{todo.title}</h2>

            <a className="UserInfo" href="mailto:Sincere@april.biz">
              {todo.userId}
            </a>
          </article>
        );
      })}
    </section>
  );
};
