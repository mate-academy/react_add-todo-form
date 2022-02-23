import React from 'react';
import { Todo } from '../types/todo';
import { User } from '../types/user';
import './TodoList.css';

type Props = {
  todos: Todo[];
  users: User[];
};

const TodoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <ul className="TodoList">
      {
        todos.map(todo => {
          const user = users.find(person => person.id === todo.userId);
          const isDone = todo.completed;

          return (
            <li
              key={todo.id}
              className="list-item"
            >
              <h3>{todo.title}</h3>
              <div>
                {`Name: ${user?.name}`}
              </div>
              <div className={isDone ? 'done' : 'not-done'}>
                {isDone ? 'This task is done' : 'This task is not done'}
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

export default TodoList;
