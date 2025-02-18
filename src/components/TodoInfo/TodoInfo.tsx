import { Todo } from '../../types/types';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return <h2 className="TodoInfo__title">{todo.title}</h2>;
};
