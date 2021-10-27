import React from 'react';
import { PrepearedTodoTypes } from '../../types/PrepearedTodoTypes';

type Props = {
  todoInfoList: PrepearedTodoTypes;
};

export const TodoInfo: React.FC<Props> = ({ todoInfoList }) => (
  <>
    <span className="todo-list__user-info">
      {todoInfoList.title}
    </span>
    <span className="todo-list__user-info">
      {todoInfoList.completed
        ? 'Done'
        : 'In Progres'}
    </span>
  </>
);
