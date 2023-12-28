import { TodoInfoProps } from '../../types/todoInfo';

export const TodoInfo: React.FC<TodoInfoProps> = ({ title }) => {
  return (
    <h2 className="TodoInfo__title">
      {title}
    </h2>
  );
};
