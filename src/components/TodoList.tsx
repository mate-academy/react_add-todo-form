import React from 'react';
import { Todo } from '../type/Todo';

type Props = {
  props: Todo[] | null,
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <div className="TodoList">
      <div className="TodoList-container">
        {props && props.map(
          (item) => (
            <div key={item.id} className="list__item">
              <div>
                { item.title }
              </div>

              <div>
                { item.completed ? 'Виконано' : 'В процессі' }
              </div>

              <div>
                {item.user?.name}
              </div>

              <div>
                {item.user?.email}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
