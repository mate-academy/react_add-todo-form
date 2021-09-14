import React from 'react';
import './TodoList.scss';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todos[];
  users: Users[];
};

export const TodoList:React.FC<Props> = (props) => {
  const { todos, users } = props;

  return (
    <div className="TodoList_container">
      <div className="TodoList__tittles_wrapper">
        <p className="TodoList__tittle">Name</p>
        <p className="TodoList__tittle">Email</p>
        <p className="TodoList__tittle">Task</p>
        <p className="TodoList__tittle">Status</p>
      </div>
      <ul className="TodoList">
        {
          todos.map(
            todo => {
              const user = users.find(userItem => userItem.id === todo.userId);
              const userEmail = user !== undefined ? user.email : 'No Email';
              const userName = user !== undefined ? user.name : 'No User Name';

              return (
                <li key={todo.id}>
                  <TodoItem todo={todo} email={userEmail} name={userName} />
                </li>
              );
            },
          )
        }
      </ul>
    </div>
  );
};
