import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todosOnList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todosOnList }) => {
  return (
    <section className="TodoList">
      {todosOnList.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <UserInfo idOnUser={todo.userId} />
        </article>
      ))}
    </section>
  );
};
