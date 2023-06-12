import { FC } from 'react';
import classNames from 'classnames';
import { TodoFullInfo } from '../../types/todoFullInfo';
import { UserInfo } from '../UserInfo';

type TodoProps = {
  todo: TodoFullInfo,
};

export const TodoInfo: FC<TodoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user
        ? (<UserInfo user={todo.user} />)
        : ('unknown user')}

    </article>
    // <article
    //   data-id={todo.id}
    //   // className="row"
    //   className={classNames(
    //     'row',
    //     'TodoInfo',
    //     {
    //       'TodoInfo--completed': todo.completed,
    //     },
    //   )}
    // >
    //   <div className="col s12 m6">
    //     <div className="card blue-grey darken-1">
    //       <div className="card-content white-text">
    //         <span className="card-title">
    //           {todo.title}
    //         </span>
    //         {todo.user
    //           ? (<UserInfo user={todo.user} />)
    //           : ('unknown user')}
    //       </div>
    //     </div>
    //   </div>
    // </article>
  );
};
