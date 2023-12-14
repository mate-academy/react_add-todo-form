import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': !todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          <a className="UserInfo" href={todo.user?.email}>
            {todo.user?.name}
          </a>
        </article>
      ))}

      {/* клас_нейм додати КОМПЛІТЕД-статус */}

      <article data-id="15" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article>

      <article data-id="2" className="TodoInfo">
        <h2 className="TodoInfo__title">
          quis ut nam facilis et officia qui
        </h2>

        <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
          Patricia Lebsack
        </a>
      </article>
    </section>
  );
};
