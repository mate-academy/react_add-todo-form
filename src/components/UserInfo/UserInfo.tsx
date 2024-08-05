import { Post } from '../../types/Post';

type Props = {
  todo: Post;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.user?.name}</h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        Patricia Lebsack
      </a>
    </article>
  );
};
