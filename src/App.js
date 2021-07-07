import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    tasks: preparedTodos,
  }

  addNewTask = (task, userId, taskId) => {
    this.setState(prevState => ({
      tasks: [
        ...prevState.tasks,
        {
          title: task,
          user: users.find(user => user.id === +userId),
          id: taskId,
          completed: false,
        },
      ],
    }));
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodo
          users={users}
          addNewTask={this.addNewTask}
        />
        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
