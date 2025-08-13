import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/Todo';

export const TodoList = ({
  todosWithUsers,
}: {
  todosWithUsers: TodoWithUser[];
}) => {
  return (
    <section className="TodoList">
      {todosWithUsers.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}

      {/* <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article>

      <article data-id="15" className="TodoInfo TodoInfo--completed">
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
      </article> */}
    </section>
  );
};
