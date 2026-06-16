type TodoInfoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    </article>
  );
};
