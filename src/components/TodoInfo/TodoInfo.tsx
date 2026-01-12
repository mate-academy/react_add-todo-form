import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  toDoInfo: Todo;
};

export const TodoInfo = (props: Props) => {
  return (
    <article
      data-id={props.toDoInfo.id}
      className={`TodoInfo ${props.toDoInfo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{props.toDoInfo.title}</h2>

      <UserInfo toDoInfo={props.toDoInfo} />
    </article>
  );
};
