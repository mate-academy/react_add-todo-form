import { Post } from '../../types/Post';

type Props = {
  currentTodo: Post;
};

export const UserInfo: React.FC<Props> = ({ currentTodo }) => {
  return (
    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">{currentTodo.user?.name}</h2>

      <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
        Patricia Lebsack
      </a>
    </article>
  );
};
