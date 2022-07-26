import React from 'react';

type Props = {
  title: string;
};

export const TodoInfo: React.FC<Props> = ({
  title,
}) => {
  return (
    <>
      {title}
    </>
  );
};
