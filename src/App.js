import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todosAddUsers: [],
  };

  componentDidMount() {
    const todosAddUsers = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({ todosAddUsers });
  }

  addTodo = (todo) => {
    const { userId, title } = todo;

    this.setState((prevState) => {
      const { todosAddUsers } = prevState;
      const newTodo = {
        userId: +userId,
        title,
        id: todosAddUsers.length + 1,
        completed: false,
        user: users.find(user => user.id === +userId),
      };

      todosAddUsers.push(newTodo);

      return { todosAddUsers };
    });
  };

  render() {
    const { todosAddUsers } = this.state;

    return (
      <main className="App">
        <h1>Add task to list of todos</h1>
        <NewTodo
          addTodo={this.addTodo}
          users={users}
        />
        <TodoList
          todos={todosAddUsers}
        />
      </main>
    );
  }
}

export default App;
