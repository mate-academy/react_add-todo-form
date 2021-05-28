import React from 'react';

class TodoList extends React.Component {
  render() {
    return (
      <>
        {this.props.todos.map(todo => (
          <div key={todo.id}>
            <h2>
              {`${todo.title} - ${todo.completed ? 'true' : 'false'}`}
            </h2>
            <p>{todo.user.name}</p>
          </div>
        ))}
      </>
    );
  }
}

export default TodoList;
