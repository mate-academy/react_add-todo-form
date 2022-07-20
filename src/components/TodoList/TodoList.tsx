import classNames from 'classnames';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: PrepearedTodo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {
        todos.map(todo => (
          <article
            data-id={todo.id}
            className={classNames(
              'TodoInfo',
              {
                'TodoInfo--completed': todo.completed,
              },
            )}
            key={todo.id}
          >
            <TodoInfo todo={todo} />
            <UserInfo user={todo.user} />
          </article>
        ))
      }
    </>
  );
};
