import { Todo } from '../../services/todo';
// import { User } from '../../services/user';
import { TodoInfo } from '../TodoInfo';

type Props = {
  // users: User[];
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  // const findUserById = (usersArr: User[], id: number): User | undefined => {
  //   return usersArr.find(user => user.id === id);
  // };

  // const todosWithUsers = todos.filter(todo =>
  //   users.some(u => u.id === todo.userId),
  // );

  return (
    <section className="TodoList">
      {todos.map(todo => {
        // const user: User = findUserById(users, todo.userId)!;

        return (
          <TodoInfo
            key={todo.id}
            user={todo.user}
            todo={todo}
            data-id={todo.id}
          />
        );
      })}

      {/* <article data-id="1" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article> */}

      {/* <article data-id="15" className="TodoInfo TodoInfo--completed">
        <h2 className="TodoInfo__title">delectus aut autem</h2>

        <a className="UserInfo" href="mailto:Sincere@april.biz">
          Leanne Graham
        </a>
      </article>

      <article data-id="2" className="TodoInfo">
        <h2 className="TodoInfo__title">
          quis ut nam facilis et officia qui
        </h2>

        <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
          Patricia Lebsack
        </a>
      </article> */}
    </section>
  );
};
