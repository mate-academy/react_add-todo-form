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
    <ul className="todo__list">
      {defaultList.map((todo) => {
        const { name, username } = todo.person;
        const { id } = todo;

        return (
          <li
            key={todo.id}
            className="todo__item"
          >
            <div>
              <h3 className="todo__title">{todo.title}</h3>
              <div className="user__info">
                <p>{`user name: ${name} ${username}`}</p>
                <p>{`ID: ${id}`}</p>
              </div>
            </div>
            <p>{todo.completed ? 'completed!' : 'DO IT'}</p>
          </li>
        );
      })}
    </ul>
  );
};
