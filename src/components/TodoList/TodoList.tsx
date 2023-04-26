import React from 'react';
// import classNames from 'classnames';
// import todos from '../../api/todos';
// import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

// {/* {todos.map(todo => (
//   // <article
//   //   data-id={todo.id}
//   //   className={classNames('TodoInfo', {
//   //     'TodoInfo--completed': todo.completed,
//   //   })}
//   //   key={todo.id}
//   // >
//   //   <h2 className="TodoInfo__title">
//   //     {todo.title}
//   //   </h2>

//   {/* <a
//       className="UserInfo"
//       href={`mailto:${users.find(user => user.id === todo.userId)?.email}`}
//     >
//       {users.find(user => user.id === todo.userId)?.name}
// </a>
//   </article>
// ))}
// // </section>
// // );
// // };*/}
