import { ToDo } from '../types';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  toDo: ToDo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ toDo }) => {
  return (
    <article
      data-id={toDo.id}
      className={`TodoInfo ${toDo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{toDo.title}</h2>

      {toDo.user && <UserInfo toDoUser={toDo.user} />}
    </article>
  );
};
