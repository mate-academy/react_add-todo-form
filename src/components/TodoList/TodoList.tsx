import { todo } from "../types";
import { TodoInfo } from "../TodoInfo";
type Props = {
    todos: todo[]
}

export const TodoList: React.FC<Props> = ({todos}) => {
    return (<section className="TodoList">
        {todos.map(todo => [
            <TodoInfo todo={todo}/>
        ])}
        
      </section>)
};
