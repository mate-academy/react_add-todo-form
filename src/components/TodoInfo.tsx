import { FC } from 'react';

type Props = {
  title: string;
  completed: boolean;
};

export const TodoInfo: FC<Props> = ({ title, completed }) => {
  return (
    <div className="TodoInfo">
      <p
        className={`${completed
          ? 'TodoInfo__title TodoInfo__title--completed'
          : 'TodoInfo__title'}`}
      >
        {title}
      </p>
    </div>
  );
};
