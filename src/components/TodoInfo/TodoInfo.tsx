import { UserInfo } from '../UserInfo/UserInfo';
import { List } from '../../types/List';

type Props = {
  todo: List;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article data-id="1" className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>
    {
      todo.person && (
        <UserInfo user={todo.person} />
      )
    }
  </article>
);
