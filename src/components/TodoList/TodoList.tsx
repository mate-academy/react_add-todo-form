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
        const { name } = todo.person;
        const { id, userId, completed } = todo;

        return (
          <li
            key={todo.id}
            className="todo__item"
          >
            <div>
              <h3 className="todo__title">{todo.title}</h3>
              <div className="user__info">
                <p>{`name: ${name}`}</p>
                <p>{`userID: ${userId}`}</p>
                <p>{`ID: ${id}`}</p>
              </div>
            </div>
            <div>
              <p>{completed ? <span className="done">all completed!</span> : <span className="not">not completed</span>}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
