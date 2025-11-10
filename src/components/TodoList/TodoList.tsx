import { Todo } from '../../types.ts/Todo';
import { User } from '../../types.ts/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos, users }: Props) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} users={users} key={`todo-${todo.id}`} />
      ))}
    </section>
  );
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
{
  /* <article data-id="1" className="TodoInfo TodoInfo--completed">
  <h2 className="TodoInfo__title">delectus aut autem</h2>

  <a className="UserInfo" href="mailto:Sincere@april.biz">
    Leanne Graham
  </a>
</article>

<article data-id="15" className="TodoInfo TodoInfo--completed">
  <h2 className="TodoInfo__title">some other todo</h2>

  <a className="UserInfo" href="mailto:Sincere@april.biz">
    Leanne Graham
  </a>
</article>

<article data-id="2" className="TodoInfo">
  <h2 className="TodoInfo__title">quis ut nam facilis et officia qui</h2>

  <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
    Patricia Lebsack
  </a>
</article> */
}
