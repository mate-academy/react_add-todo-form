import React from 'react';
import { ToDo } from '../../types/ToDo';

interface Props {
  toDo: ToDo
}

export const TodoInfo: React.FC<Props> = ({ toDo }) => (
  <article data-id="1" className="TodoInfo TodoInfo--completed">
    <h2 className="TodoInfo__title">
      {toDo.title}
    </h2>

    {/* <UserInfo /> */}
  </article>
);
