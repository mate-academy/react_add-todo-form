// import { useState } from 'react';
// import todos from '../../api/todos';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  user: string;
  email: string;
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ user, email, todos }) => {
  const todoList = [...todos];

  return (
    <section className="TodoList">
      {todoList.map(item => {
        return (
          <article
            data-id={item.id}
            key={item.id}
            className="TodoInfo TodoInfo--completed"
          >
            <h2 className="TodoInfo__title">{item.title}</h2>
            <a className="UserInfo" href={email}>
              {user}
            </a>
          </article>
        );
      })}
      <article data-id="1" className="TodoInfo TodoInfo--completed">
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
      </article>
    </section>
  );
};
