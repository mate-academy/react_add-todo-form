import React from 'react';

export class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    // console.log(todos);
    return (
      <ul>
        {todos.map(({ name, title, completed, id }) => (
          <li key={id}>
            <>
              <p>{name}</p>
              <h2>{title}</h2>
              <p>{completed}</p>
            </>
          </li>
        ))}
      </ul>
    );
  }
}
