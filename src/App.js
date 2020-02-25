import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList';
import NewTodo from './components/newTodo/NewTodo';

const preparedTodos = todos.map(task => (
  {
    ...task,
    user: users.find(user => user.id === task.userId),
  }
));

class App extends React.Component {
  state = {
    tasks: [...preparedTodos],
  }

  addTask = (task) => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, { ...task }],
    }));
  }

  render() {
    const { tasks } = this.state;

    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>

          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>
        <NewTodo
          users={users}
          addTask={this.addTask}
          tasks={tasks}
        />
        <TodoList tasks={tasks} />
      </>
    );
  }
}

export default App;
