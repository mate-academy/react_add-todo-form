import React from 'react';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Props {
  todos: Todo[];
}

export class TodoList extends React.PureComponent<Props, {}> {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <li key={todo.id}>
            {todo.id}
            .
            {' '}
            {todo.title}
            {' '}
            <br />
            {' '}
            To be done by user with id #
            {todo.userId}
          </li>
        ))}
      </ul>
    );
  }
}
