import { PreparedTodo } from '../../types/PreparedTodo';

import './TodoInfo.scss';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const {
    title,
    completed,
  } = todo;

  return (
    <ul className="todoInfo">
      <li className="todoInfo__todo">
        {title}
      </li>
      <li className="todoInfo__todo">
        {completed ? 'Done' : 'In progres'}
      </li>
    </ul>
  );
};
