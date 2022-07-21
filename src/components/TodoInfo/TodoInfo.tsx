import React from 'react';

type Info = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Info> = ({ title, completed }) => {
  return (
    <>
      <h1 data-cy="title" className="App__task-title">{title}</h1>
      <h3 data-cy="status" className="App__task-status">
        {completed ? 'Done' : 'In progress'}
      </h3>
    </>
  );
};
