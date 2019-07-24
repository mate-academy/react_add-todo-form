/* eslint-disable */
import React from 'react';

class TodoList extends React.Component {
  getTodoWidthUser = () => (
    this.props.todos.map((todo, i) => ({
      ...todo,
      id: (!todo.id) ? i + 1 : todo.id,
      user: this.props.users.find(user => user.id === todo.userId),
    }))
  );

  render() {
    return (
      <div className="todoList">
        {this.getTodoWidthUser().map(todo => (
          <div key={this.getTodoWidthUser().id} className="todoList__item">
            <h3 className="todoList__item-name">{todo.user.name}</h3>
            <div className="todoList__item-todo">
              <p className="todoList__item-id">
                { todo.id }
              .
              </p>
              <p className="todoList__item-title">{todo.title}</p>
              <input
                type="checkbox"
                checked={todo.completed}
                className="todoList__item-check"
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TodoList;
