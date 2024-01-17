import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfoProps } from '../types';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todoInfo }) => {
  return (
    <div>
      <article data-id={todoInfo.id} className={`TodoInfo ${todoInfo.completed ? 'TodoInfo--completed' : null}`}>
        <h2 className="TodoInfo__title">
          {todoInfo.title}
        </h2>

        <UserInfo userInfo={todoInfo.user} />
      </article>
    </div>
  );
};
