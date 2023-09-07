import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

interface Props {
  todos: Todo[]
}
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <article
          key={todo.id}
          data-id="1"
          className={cn('TodoInfo', { 'TodoInfo--completed': false })}
        >
          <TodoInfo title={todo.title} />
          <UserInfo user={todo.user} />
        </article>
      ))}
      {/* <article data-id="1" className="TodoInfo TodoInfo--completed"> */}
      {/*   <h2 className="TodoInfo__title"> */}
      {/*     delectus aut autem */}
      {/*   </h2> */}

      {/*   <a className="UserInfo" href="mailto:Sincere@april.biz"> */}
      {/*     Leanne Graham */}
      {/*   </a> */}
      {/* </article> */}

      {/* <article data-id="15" className="TodoInfo TodoInfo--completed"> */}
      {/*   <h2 className="TodoInfo__title">delectus aut autem</h2> */}

      {/*   <a className="UserInfo" href="mailto:Sincere@april.biz"> */}
      {/*     Leanne Graham */}
      {/*   </a> */}
      {/* </article> */}

      {/* <article data-id="2" className="TodoInfo"> */}
      {/*   <h2 className="TodoInfo__title"> */}
      {/*     quis ut nam facilis et officia qui */}
      {/*   </h2> */}

      {/*   <a className="UserInfo" href="mailto:Julianne.OConner@kory.org"> */}
      {/*     Patricia Lebsack */}
      {/*   </a> */}
      {/* </article> */}
    </section>
  );
};
