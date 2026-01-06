import { Todos } from '../../types/Todos';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todos;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}

      {/* Verificar o valor de todos os campos de um todo
      <br />
      <span>{todo.id}</span>
      <br />
      <span>{todo.title}</span>
      <br />
      {todo.completed ? <span>true</span> : <span>false</span>}
      <br />
      <span>{todo.userId}</span>
      <br />
      <span>{todo.user.id}</span>
      <br />
      <span>{todo.user.name}</span>
      <br />
      <span>{todo.user.username}</span>
      <br />
      <span>{todo.user.email}</span>
      <br /> */}
    </article>
  );
};
