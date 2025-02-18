import { Todos } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todos;
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

{
  /* <section className="TodoList">
  <article data-id="1" className="TodoInfo TodoInfo--completed">
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
  </article>
</section>; */
}
