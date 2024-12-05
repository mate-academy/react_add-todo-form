import { Todo } from '../TodoList';
import { User } from '../UserInfo';

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
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
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
