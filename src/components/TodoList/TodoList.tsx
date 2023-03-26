import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todolist: Todo[],
  userlist: User[],
};

export const TodoList: React.FC<Props> = ({ todolist, userlist }) => {
  return (
    <section className="TodoList">
      {todolist.map(list => (
        <TodoInfo key={list.id} todo={list} user={userlist} />
      ))}
    </section>
  );
};
