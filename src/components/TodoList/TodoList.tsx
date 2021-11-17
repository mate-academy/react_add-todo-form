import React from 'react';
import { PreparedTodo } from '../../type/type';
import './TodoList.scss';

type Props = {
  todos: PreparedTodo[];
};

// eslint-disable-next-line react/prefer-stateless-function
export class TodoList extends React.Component<Props, {}> {
  render() {
    const { todos } = this.props;

    return (
      <ul className="todo">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="todo--li"
          >
            {`id: ${todo.id}`}
            <br />
            {todo.title}
            <br />
            {`user id: ${todo.userId}`}
          </li>
        ))}
      </ul>
    );
  }
}
