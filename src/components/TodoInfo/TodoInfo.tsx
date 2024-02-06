import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  toDo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ toDo }) => {
  return (
    <article
      data-id={toDo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': toDo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {toDo.title}
      </h2>

      {toDo.user && <UserInfo user={toDo.user} />}
    </article>
  );
};
