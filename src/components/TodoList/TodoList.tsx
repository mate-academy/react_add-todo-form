import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  user: User;
  todo: Todo;
};

export const TodoList:React.FC <Props> = ({ user, todo }) => (
  <section className="TodoList">
    <TodoInfo user={user} todo={todo} />
  </section>
);
