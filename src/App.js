import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import users from './api/users';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

const todosWithUsers = todosFromServer.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  })
);

class App extends React.Component {
  state = { todos: [...todosWithUsers] }

  addTodo = (title, userId) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId,
          id: prevState.todos.length + 1,
          title,
          completed: false,
          user: users.find(user => user.id === userId),
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <NewTodo
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
        <p>
          <span>Todos in list: </span>
          {this.state.todos.length}
        </p>
      </div>
    );
  }
}

export default App;
