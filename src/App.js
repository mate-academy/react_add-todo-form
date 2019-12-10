import React from 'react';

import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import './App.css';

class App extends React.Component {
  state = {
    todosWithUsers: [],
  }

  componentDidMount() {
    const todosWithUsers = todos.map((todo, index) => {
      return {
        ...todo,
        id: index + 1,
        user: users.find(user => user.id === todo.userId),
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
        <h1>Add Todo Form</h1>
          <NewTodo
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
