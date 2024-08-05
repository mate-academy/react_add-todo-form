import { Post } from '../../types/Post';

type Props = {
  todo: Post;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        {todo.user?.name}
      </a>
    </article>
  );
};
