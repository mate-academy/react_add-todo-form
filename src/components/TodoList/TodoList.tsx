import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';

import { Todo } from '../../types/Todo';
import { UserI } from '../../types/User';

interface Props {
  todos: Todo[];
  getUser: (userId: number) => UserI | undefined;
}

export const TodoList: React.FC<Props> = ({ todos, getUser }) => {
  return (
    <>
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id="1"
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <TodoInfo todo={todo} user={getUser(todo.userId)}></TodoInfo>
        </article>
      ))}
    </>
  );
};
