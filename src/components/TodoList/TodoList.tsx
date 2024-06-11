import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        return (
          <article
            data-id={todo.id}
            key={todo.id}
            className={classNames('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <TodoInfo todo={todo} />
            <UserInfo user={todo.user} />
          </article>
        );
      })}
    </section>
  );
};
