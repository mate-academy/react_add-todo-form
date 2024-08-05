import { Post } from '../../types/Post';

type Props = {
  todos: Post[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article>
      <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article>

      <article data-id="2" className="TodoInfo">
        <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

        <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
          Patricia Lebsack
        </a>
      </article>
      {todos.map(todo => {
        <article
          key={todo.id}
          className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>
          <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
            {todo.user?.name}
          </a>
        </article>;
      })}
    </>
  );
};
