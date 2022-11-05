import { FC } from 'react';

import { TodoInfo } from '../TodoInfo';

import { TodoWithUser } from '../../types';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map((todoWithUser: TodoWithUser) => (
          <TodoInfo todo={todoWithUser} key={todoWithUser.id} />
          // <TodoInfo
          //   key={todoWithUser.id}
          //   user={todoWithUser.user}
          //   id={todoWithUser.id}
          //   title={todoWithUser.title}
          //   completed={todoWithUser.completed}
          //   userId={todoWithUser.userId}
          // />
        ))
      }
    </section>
  );
};
