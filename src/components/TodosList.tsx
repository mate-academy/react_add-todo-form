import React from 'react';

type Props = {
  todos: PreparedTodo[],
};

export const TodosList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul className="content column is-half">
      {todos.map(todo => (
        <li key={todo.id}>
          <div className="box">
            <h2 className="title pb-4">{todo.title}</h2>
            <p className="subtitle block">
              Completed:
              {' '}
              {todo.completed ? '✔️' : '❌'}
            </p>
            <div className="block">
              <p>
                Name:
                {' '}
                {todo.user?.name}
              </p>
              <p>
                Email:
                {' '}
                {todo.user?.email}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
