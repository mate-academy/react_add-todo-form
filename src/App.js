import React from 'react';
import { TodoList } from './components/TodoList';
import { AddForm } from './components/AddForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedData = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    title: '',
    selected: '',
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  addTodo = () => {
    const { selected } = this.state;

    if (this.state.title === '' || selected === '') {
      // alert('all fields are required')
      return;
    }

    preparedData.push({
      title: this.state.title,
      user: users[selected],
    });
    this.setState({});
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__title"> Add Form</h1>
        <TodoList todos={preparedData} />
        <AddForm
          value={this.state.title}
          changeHandler={this.handleChange}
          clickHandler={this.addTodo}
          users={users}
        />
      </div>
    );
  }
}

export default App;
