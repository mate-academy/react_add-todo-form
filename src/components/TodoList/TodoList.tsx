import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todoList: Todo[],
  userList: User[],
};

export const TodoList: React.FC<Props> = ({ todoList, userList }) => {
  return (
    <section className="TodoList">
      {todoList.map(list => (
        <TodoInfo key={list.id} todo={list} users={userList} />
      ))}
    </section>
  );
};
