import React from 'react';
import './App.css';

import { NewTodo } from './components/NewTodo';
import { TaskList } from './components/TasksList';

import users from './api/users';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: todosFromServer,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: prevState.todos.concat([{
        title: todo.task,
        id: prevState.todos.length + 1,
        userId: todo.userId,
      }]),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <NewTodo users={users} addTodo={this.addTodo} />
        <TaskList todos={todos} />
      </div>
    );
  }
}

export default App;
