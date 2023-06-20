import React from 'react';
// import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        // const { id, title, completed } = todo;

        return <TodoInfo todo={todo} />;

        // return (
        //   <article
        //     key={id}
        //     data-id="1"
        //     className={classNames('TodoInfo', {
        //       'TodoInfo--completed': completed,
        //     })}
        //     // className="TodoInfo TodoInfo--completed"
        //   >
        //     <h2 className="TodoInfo__title">
        //       {title}
        //     </h2>

        //     <a className="UserInfo" href="mailto:Sincere@april.biz">
        //       Leanne Graham
        //     </a>
        //   </article>
        // );
      })}
    </section>
  );
};
