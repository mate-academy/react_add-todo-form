import React from 'react';

type Props = {
  todos: any,
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo">
    {todos.map((value:any) => (
      <li className="todo__item" key={value.id}>
        {value.title}
        {' '}
        {
          value.userName
            && (
              <div>
                Customer:
                {' '}
                {value.userName}
              </div>
            )
        }
        {
          value.selectedUserId
          && (
            <div>
              UserId:
              {' '}
              {value.selectedUserId}
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
