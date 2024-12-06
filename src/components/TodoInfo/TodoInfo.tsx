import { Todo } from '../TodoList';
import { User } from '../UserInfo';
import classNames from 'classnames';

export const TodoInfo = ({
  todos = [],
  users,
}: {
  todos: Todo[];
  users: User[];
}) => {
  const findUser = (userId: number) => {
    const us = users.find(user => user.id === userId);

    return (
      us || {
        id: 0,
        name: '',
        username: '',
        email: '',
      }
    );
  };

  return (
    <>
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a
            className="UserInfo"
            href={`mailto:${findUser(todo.userId)?.email}`}
          >
            {findUser(todo.userId)?.name}
          </a>
        </article>
      ))}
    </>
  );
};
