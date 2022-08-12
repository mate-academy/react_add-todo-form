import React from 'react';

type Props = {
  title: string,
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { title } = props;

  return (
    <h2 className="TodoInfo__title">
      {title}
    </h2>
  );
};
