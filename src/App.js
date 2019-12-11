import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...todosWithUsers],
  };

  addNewTodo = (title, userName) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title, user: { name: userName },
        }],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">List of Todos </h1>
        <div className="wrapper">
          <NewTodo addNewTodo={this.addNewTodo} />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
