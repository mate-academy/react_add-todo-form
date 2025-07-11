import classNames from 'classnames';
import { TodoListProps } from '../../types/types';
import { UserInfo } from '../UserInfo';

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed === true,
          })}
          key={todo.id}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          {todo.user && <UserInfo user={todo.user} />}
        </article>
      ))}
    </section>
  );
};
