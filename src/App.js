import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import FormTodo from './Components/FormTodo/FormTodo';

function usersListTodo(todosArray, usersArray) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersArray.find(person => person.id === todo.userId),
  }));
}

const usersList = usersListTodo(todos, users);

class App extends React.Component {
  state = {
    names: usersList.map(item => item.user.name),
    tasks: usersList.map(item => item.title),
    id: usersList.length,
  };

  addUserTask = (names, tasks) => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, names],
      names: [...prevState.names, tasks],
      id: prevState.id + 1,
    }));
  }

  render() {
    const {
      names,
      tasks,
      id,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <FormTodo
          usersListShow={users}
          tasks={tasks}
          names={names}
          id={id}
          addUserTask={this.addUserTask}
        />
      </div>
    );
  }
}

export default App;
