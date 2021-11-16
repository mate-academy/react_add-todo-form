import React from 'react';

interface Todo {
  userId: number,
  id: number,
  title: string,
}

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo">
    {todos.map((value: Todo) => (
      <li className="todo__item" key={value.id}>
        {value.title}
        {' '}
        {
          value.userId
          && (
            <div>
              UserId:
              {' '}
              {value.userId}
            </div>
          )
        }
        {
          value.id
          && (
            <div>
              OrderId:
              {' '}
              {value.id}
            </div>
          )
        }
      </li>
    ))}
  </ul>
);
