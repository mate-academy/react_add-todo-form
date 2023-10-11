interface TodoInfoProps {
  post: Post;
}

interface Post {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ post }) => {
  return (
    <h2 className="TodoInfo__title">
      {post.title}
    </h2>
  );
};
