import { UserInfo } from '../UserInfo';

interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
}

export const TodoInfo: React.FC<Todo> = () => {
  return (
    <article data-id="2" className="TodoInfo">
      <h2 className="TodoInfo__title">
        quis ut nam facilis et officia qui
      </h2>
      <UserInfo />
    </article>
  );
};
