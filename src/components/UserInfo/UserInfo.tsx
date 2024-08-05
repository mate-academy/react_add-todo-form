import { Post } from '../../types/Post';

type Props = {
  todo: Post;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  return (
    <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
      {todo.user?.name}
    </a>
  );
};
