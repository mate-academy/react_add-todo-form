import React from 'react';

import './TodoInfo.scss';

type Props = {
  title: string;
  completed: boolean;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
}) => (
  <>
    <h3 className="todoinfo__title">
      {title}
    </h3>

    <p className="todoinfo__completed">
      {completed ? 'Completed' : 'In progress'}
    </p>
  </>
);
