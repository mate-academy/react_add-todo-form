import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TodoList from './api/Components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';
import { MainForm } from './api/Components/Form/Form';

const newTodos = todos.map(item => ({
  ...item,
  name: users.find(value => value.id === item.userId).name,
}
));

class App extends React.PureComponent {
  state = {
    newTodos,
  }

  addNewPerson = (person) => {
    this.setState(prev => ({ newTodos: [...prev.newTodos, person] }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={this.state.newTodos} />
        <MainForm
          addNewPerson={this.addNewPerson}
          todosLength={this.state.newTodos.length}
        />
      </div>
    );
  }
}

export default App;
