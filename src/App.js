import React from 'react';
import './App.css';

import NewTodos from './NewTodos';
import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(u => u.id === todo.userId),
    })),
  }

  handleFormSubmit = (currentTitle, currentUserId) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: +currentUserId,
          user: users.find(u => u.name === currentUserId),
          id: state.todos.length + 1,
          title: currentTitle,
          completed: false,
        },
      ],
    }));
  };

  render() {
    return (
      <div>
        <div className="add-todo-form">
          <NewTodos
            onFormSubmit={this.handleFormSubmit}
          />
        </div>
        <div className="users-info">
          {this.state.todos.map(todo => (

            <div className="single-user">
              <div>
                ID:
                {todo.id}
              </div>
              <div>
                Title:
                {todo.title}
              </div>
              <div>
                Name:
                {todo.user.name}
              </div>
              <div>
                Email:
                {todo.user.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
