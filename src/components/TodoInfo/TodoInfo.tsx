import { UserInfo } from "../UserInfo";

interface User {
  name: string,
  email: string,
}

interface TodoInfo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
  user: User | null,
}


export const TodoInfo = ({todo}: {todo: TodoInfo}) => {
return (
  <article
  data-id = {todo.id}
  className = {`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
    <h2
    className = "TodoInfo__title">
      {todo.title}
    </h2>
    {todo.user && <UserInfo user={todo.user}/>}
  </article>
)

};
