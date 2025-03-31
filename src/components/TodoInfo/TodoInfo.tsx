import { Task } from './../../types/Task';

interface TodoInfoProps {
  task: Task;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ task }) => {
  const { id, title, user } = task;

  return (
    <article data-id={id} key={id} className="TodoInfo">
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </article>
  );
};
