import { Todo } from '../../Types';
import './TodolistInfo.scss';

type Props = {
  todo: Todo;
};

export const TodolistInfo: React.FC<Props> = ({ todo }) => (
  <div className="TodolistInfo">
    <div className={
      (todo.completed)
        ? 'TodolistInfo__task--done'
        : 'TodolistInfo__task--todo'
    }
    >
      {todo.title}
    </div>
  </div>
);
