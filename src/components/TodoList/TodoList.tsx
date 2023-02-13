import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      { todos.map(todo => {
        return (
          <article
            key={todo.id}
            data-id={todo.id}
            className={classNames(
              'TodoInfo',
              { 'TodoInfo--completed': todo.completed },
            )}
          >
            <TodoInfo todo={todo} />
          </article>

        );
      })}
    </section>
  );
};
