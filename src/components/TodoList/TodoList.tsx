import { UserTodos } from '../../App';
import { TodoInfo } from '../TodoInfo';

type Props = {
  userList: UserTodos[];
};

export const TodoList: React.FC<Props> = ({ userList }) => {
  return (
    <section className="TodoList">
      {userList
        .flatMap(user =>
          user.todoPosts.map(post => ({
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            userLogin: user.userLogin,
            todoPost: post,
          })),
        )
        .sort(
          (a, b) =>
            a.todoPost.createdAt.getTime() - b.todoPost.createdAt.getTime(),
        )
        .map(postToPublice => (
          <TodoInfo todo={postToPublice} key={postToPublice.todoPost.id} />
        ))}
    </section>
  );
};
