import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../Types/ToDo';

interface Props {
  toDo: ToDo;
}

export const TodoInfo: React.FC<Props> = ({ toDo }) => {
  return (
    <article
      data-id={toDo.id}
      className={classNames('message', {
        ['is-warning']: toDo.completed === false,
        ['is-success']: toDo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{toDo.title}</h2>

      <UserInfo user={toDo.user} />
    </article>
  );
};
