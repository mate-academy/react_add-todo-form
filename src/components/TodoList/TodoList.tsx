import React from 'react';
import './TodoList.scss';
import { TodoItem } from '../TodoItem';

type Props = {
  preparedToDos:PreparedToDo[]
};

export const TodoList:React.FC<Props> = (props) => {
  const { preparedToDos } = props;

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
          preparedToDos.map(
            todo => {
              return (
                <li key={todo.id}>
                  <TodoItem todo={todo} />
                </li>
              );
            },
          )
        }
      </ul>
    </div>
  );
};
