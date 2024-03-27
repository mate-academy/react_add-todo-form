import { Todo } from "../../types/types";
import { TodoInfo } from '../TodoInfo';

type Props = {
    todos: Todo[];
}

export const TodoList = ({ todos }: Props) => {

    return(
        <section className="TodoList">
            {
                todos.map(todo => 
                    < TodoInfo key={todo.id} todo={todo}/>   
                )
            }
            {/* < TodoInfo /> */}

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
    )
};
