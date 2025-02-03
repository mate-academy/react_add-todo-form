import React from 'react';
import { TodoInfo } from '../TodoInfo';

import { USERTODO } from '../../types/UserTodo';

type Props = {
  todos: USERTODO[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
    {/* <article data-id="1" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">delectus aut autem</h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article>

    <article data-id="15" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">delectus aut autem</h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article>

    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        Patricia Lebsack
      </a>
    </article> */}
  </section>
);
