import { Todo } from "../../types";
import { TodoInfo } from "../TodoInfo";

type Props = {
  todoList:Todo[]
}
export const TodoList = ( { todoList }:Props ) => {
  return (
    <>
        {todoList.map(todo => (
          <TodoInfo todo={todo} key={todo.id}/>
        ))}
    </>
  )
};
