import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

export const TodoInfo : React.FC<TodoInfoProps> = ({todo}) => {
  return (
    <section className="TodoList">
      <article data-id={todo.id}
               className={cn("TodoInfo" ,
                 {
                   'TodoInfo--completed' : todo.completed,
                 }

               )}>

        <h2 className="TodoInfo__title">{todo.title}</h2>
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
      </article>
    </section>
  );
};

