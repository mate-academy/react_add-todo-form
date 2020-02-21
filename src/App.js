import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends React.Component {
  state = {
    tasks: [],
    people: [],
  };

  componentDidMount() {
    this.setState({
      tasks: [...todos],
      people: [...users],
    });
  }

  addTask = (task) => {
    this.setState(prevState => ({
      ...prevState,
      tasks: [...prevState.tasks, task],
    }));
  }

  render() {
    const { tasks, people } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="container">
          <NewTodo
            users={people}
            addTask={this.addTask}
          />
          <TodoList
            todos={tasks}
          />
        </div>

      </div>
    );
  }
}

export default App;
