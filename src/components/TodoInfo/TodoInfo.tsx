import { Todos } from '../../types/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <article
      data-id={todo.id}
      key={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <a className="UserInfo" href={`mailto:${todo.user.email}`}>
          {todo.user.name}
        </a>
      )}
    </article>
  </>
);
