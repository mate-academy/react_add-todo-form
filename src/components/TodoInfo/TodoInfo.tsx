import React from 'react';

type Props = {
  title: string;
};

export const TodoInfo: React.FC<Props> = ({ title }) => {
  return (
    <>
      <h1 className="TodoInfo__title">
        {title}
      </h1>
    </>
  );
};
