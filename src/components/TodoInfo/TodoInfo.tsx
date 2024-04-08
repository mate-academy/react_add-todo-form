import { UserInfo } from '../UserInfo';

export const TodoInfo = () => {
  return (
    <>
      <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <UserInfo />
      </article>

      <article data-id="15" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <UserInfo />
      </article>

      <article data-id="2" className="TodoInfo">
        <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

        <UserInfo />
      </article>
    </>
  );
};
