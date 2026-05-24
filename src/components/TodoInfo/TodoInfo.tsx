interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  // Робимо об'єкт user необов'язковим, додавши знак питання (бо в стартових даних його може не бути)
  user?: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {/* МАГІЯ ТУТ: Ми перевіряємо, чи існує todo.user.
          Код в дужках відпрацює лише тоді, коли user не undefined */}
      {todo.user && (
        <a className="UserInfo" href={`mailto:${todo.user.email}`}>
          {todo.user.name}
        </a>
      )}
    </article>
  );
};
