import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        // <article
        //   key={todo.id}
        //   data-id={todo.id}
        //   className={classNames('TodoInfo', {
        //     'TodoInfo--completed': todo.completed,
        //   })}
        // >
        //   <h2 className="TodoInfo__title">
        //     {todo.title}
        //   </h2>

        //   <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
        //     {todo.user?.name}
        //   </a>
        // </article>

        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
