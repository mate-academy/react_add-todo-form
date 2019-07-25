import React from 'react';
import './App.css';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import todos from './api/todos';
import users from './api/users';

class App extends React.Component {
  state = {
    usersWithTodos: [],
  }

  componentDidMount() {
    const usersWithTodos = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({
      usersWithTodos,
    });
  }

  handleSubmit = (id, todo) => {
    this.setState(state => ({
      usersWithTodos: [...state.usersWithTodos,
        {
          id: state.usersWithTodos.length + 1,
          title: todo,
          completed: false,
          user: users.find(user => user.id === +id),
        }],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoList todos={this.state.usersWithTodos} />
        <NewTodo
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default App;
