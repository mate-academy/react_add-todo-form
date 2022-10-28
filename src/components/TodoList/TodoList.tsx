import { FC } from 'react';
import classNames from 'classnames';
import { FullTodoInfo } from '../../types/Type';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

interface Prop {
  todos: FullTodoInfo[];
}

export const TodoList: FC<Prop> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const { id, user, completed } = todo;

        return (
          <article
            data-id={id}
            className={classNames('TodoInfo',
              { 'TodoInfo--completed': completed })}
            key={id}
          >
            <TodoInfo todo={todo} />
            {user && <UserInfo user={user} />}
          </article>
        );
      })}
    </section>
  );
};
