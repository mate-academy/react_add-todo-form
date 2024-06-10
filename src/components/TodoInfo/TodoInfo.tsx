import { TodoItem } from '../../types/TodoItem';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  item: TodoItem;
};

export const TodoInfo: React.FC<Props> = ({ item }) => (
  <article
    data-id={item.id}
    key={item.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': item.completed,
    })}
  >
    <h2 className="TodoInfo__title">{item.title}</h2>

    <UserInfo user={item.user} />
  </article>
);
