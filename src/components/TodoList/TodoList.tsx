import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type TodoListProps = {
  todos: Todo[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id="1"
            className="TodoInfo TodoInfo--completed"
            key={todo.id}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <UserInfo email={todo.title} name={todo.title} />
          </article>
        ))}
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
    </>
  );
};
