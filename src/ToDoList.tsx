import React from 'react';

type Props = {
  users: any[],
  todos: any[],
};

const ToDoList: React.FC<Props> = ({ users, todos }) => {
  return (
    <ul>
      { users.map(user => {
        const userToDos = todos.filter(todo => todo.userId === user.id);

        if (!userToDos.length) {
          return null;
        }

        return (
          <li key={user.name}>
            <h2>{user.name}</h2>
            <ul>
              {userToDos.map(todo => {
                return (
                  <li key={todo.id}>
                    <p className={todo.completed ? 'completed-todo' : ''}>{todo.title}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
