import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoInfoProps {
  id?: number;
  title?: string;
  completed?: boolean;
  user?: User;
  todo?: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = props => {
  const { todo } = props;

  const id = props.id || todo?.id;
  const title = props.title || todo?.title;
  const completed =
    props.completed !== undefined ? props.completed : todo?.completed;
  const user = props.user || todo?.user;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </article>
  );
};
