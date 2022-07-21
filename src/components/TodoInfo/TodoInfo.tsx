import classNames from 'classnames';
import React from 'react';

type Props = {
  title: string;
  isCompleted: boolean;
};

export const TodoInfo: React.FC<Props> = ({ title, isCompleted }) => (
  <>
    <h2 className="subtitle is-3">{title}</h2>
    <p className={classNames('subtitle is-5', {
      'has-text-success': isCompleted,
      'has-text-danger': !isCompleted,
    })}
    >
      {isCompleted ? 'Done' : 'Not completed!'}
    </p>
  </>
);
