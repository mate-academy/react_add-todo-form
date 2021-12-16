import React from 'react';
import { Todo } from '../type/Todo';

type Props = {
  props: Todo[] | null,
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <div className="TodoList">
      {props && props.map(
        (item) => (
          <div key={item.id}>
            { item.title }
            { item.completed ? 'done' : 'in progress' }
            {item.user?.name}
          </div>
        ),
      )}
    </div>
  );
};
