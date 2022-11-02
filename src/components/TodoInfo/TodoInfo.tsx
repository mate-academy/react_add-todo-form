import { FC } from 'react';
import { FullTodoInfo } from '../../types/Type';

interface Prop {
  todo: FullTodoInfo;
}

export const TodoInfo: FC<Prop> = ({ todo }) => {
  return (
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
  );
};
