import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
  };

  handleFormSubmit = (userId, title) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title,
          userId,
          id: state.todos.length + 1,
          user: users.find(user => user.id === userId),
        },
      ],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <NewTodo
          onFormSubmit={this.handleFormSubmit}
          users={users}
        />

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
