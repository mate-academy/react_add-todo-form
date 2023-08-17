import cn from 'classnames';
import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          key={todo.id}
          className={cn('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <TodoInfo
            title={todo.title}
            userId={todo.userId}
          />
        </article>
      ))}
    </section>
  );
};
