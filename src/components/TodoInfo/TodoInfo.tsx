import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

/*Показує заголовок і користувача.
Якщо задача виконана (completed: true), додає клас TodoInfo--completed.*/
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    </article>
  );
};
