import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Task } from '../../types/Task';

type Props = {
  task: Task;
};
export const TodoInfo: React.FC<Props> = ({ task }) => {
  return (
    <>
      <article
        data-id="1"
        className={classNames('TodoInfo', {
          'TodoInfo--completed': task.completed,
        })}
      >
        <h2 className="TodoInfo__title">{task.title}</h2>

        <UserInfo user={task.user} />
      </article>
    </>
  );
};
