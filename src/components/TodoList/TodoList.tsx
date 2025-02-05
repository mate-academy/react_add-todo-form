import { Todo } from './../../types/Todo';

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id={todo.id}
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a
            className="UserInfo"
            href={`mailto:user${todo.userId}@example.com`}
          >
            {todo.user?.name}
          </a>
        </article>
      ))}
    </section>
  );
};
