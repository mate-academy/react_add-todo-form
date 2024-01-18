import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  todos: TodoWithUser[],
};

export const TodoList: React.FC<Props> = ({ todos: todosWithUser }) => {
  return (
    <section className="TodoList">
      {todosWithUser
        // eslint-disable-next-line max-len
        .map(todoWithUser => <TodoInfo todoWithUser={todoWithUser} key={todoWithUser.id} />)}
    </section>
  );
};
