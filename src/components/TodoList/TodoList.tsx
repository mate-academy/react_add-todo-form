import React from 'react';
import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};

{
  /*
<section className="TodoList">
    <article data-id="1" className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title"></h2>

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
    </article>
  </section>; */
}
