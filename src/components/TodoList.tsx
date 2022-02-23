import React from 'react';

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
};

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  person: User,
};

type Todos = {
  defaultList: Todo[];
};

export const TodoList: React.FC<Todos> = ({ defaultList }) => {
  return (
    <ul>
      {defaultList.map((todo) => {
        const { name, username, phone } = todo.person;

        return (
          <li
            key={todo.id}
            className={todo.completed ? 'todo__item done' : 'todo__item'}
          >
            <div>
              <h5 className="todo__title">{todo.title}</h5>
              <div className="user__info">
                <h6>{`name: ${name} ${username}`}</h6>
                <h6>{`phone: ${phone}`}</h6>
              </div>
            </div>
            <p>{todo.completed ? 'completed!' : 'DO IT'}</p>
          </li>
        );
      })}
    </ul>
  );
};
