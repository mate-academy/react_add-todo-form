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
      </section>
    )
};
