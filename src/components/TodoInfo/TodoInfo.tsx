import React from 'react';
import { PreparedTodosType } from '../../types/PreparedTodosType';

interface Props {
  item: PreparedTodosType
}

const TodoInfo: React.FC<Props> = ({ item }) => {
  const {
    title,
    completed,
  } = item;

  return (
    <>
      <h2 className="title">{title}</h2>
      <div className="progress">
        {completed ? 'Completed' : 'Work in progress'}
      </div>
    </>
  );
};

export default TodoInfo;
