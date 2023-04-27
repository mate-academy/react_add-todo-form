import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodosWithUser } from '../../types/Types';

type Props = {
  todo: TodosWithUser
};

export const TodoList:React.FC <Props> = ({ todo }) => (
  <section className="TodoList">
    <TodoInfo todo={todo} />
  </section>
);
