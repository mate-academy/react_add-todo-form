import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <article
        key={todo.id}
        className={classNames('TodoInfo',
          { 'TodoInfo--completed': todo.completed === true })}
      >
        <TodoInfo todo={todo} />
      </article>
    ))}
  </section>
);
