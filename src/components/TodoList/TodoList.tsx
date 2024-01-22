import classNames from 'classnames';
import { Todo } from '../../types/todo';

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <article
        key={todo.id}
        data-id={todo.id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        <h2 className="TodoInfo__title">
          {todo.title}
        </h2>

        <a
          className="UserInfo"
          href={`mailto:${todo.user?.email}`}
        >
          {todo.user?.name}
        </a>
      </article>
    ))}
  </section>
);
