import React from 'react';
import { TodosInterFace } from '../../api/todos';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodosInterFace> = ({
  title,
  person,
}) => (
  <article className="TodoInfo TodoInfo--completed">
    <h2 className="TodoInfo__title">
      {title}
    </h2>
    {person && <UserInfo {...person} key={title} />}
  </article>
);
