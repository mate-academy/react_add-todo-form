import React from 'react';

import TodoList from './TodoList';
import todos from './api/todos';
import users from './api/users';
import AddTodo from './AddTodo';
import './App.css';

class App extends React.Component {
  state = {
    todosWithUsers: [],
  }

  componentDidMount() {
    const todosWithUsers = todos.map((todo, index) => {
      return {
        ...todo,
        id: index+1,
        user: users.find(user=> user.id === todo.userId),
    }})

    this.setState({ todosWithUsers });
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todosWithUsers: [...prevState.todosWithUsers, todo],
    }));
  };

  render() {
    const { todosWithUsers } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
          <AddTodo
            addTodo={this.addTodo}
            users={users}
            todos={todosWithUsers}
          />
          <TodoList
            todos={todosWithUsers}
          />
      </div>
    );
  }
}

export default App;
