import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/ToDo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => (
  <li
    className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    data-id={id}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </li>
);
