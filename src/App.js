import React from 'react';
import { TodoList } from './components/TodoList';
import { AddForm } from './components/AddForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import usersFromServer from './api/usersFromServer';
import todos from './api/todos';

const preparedData = todos.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    movies: preparedData,
    title: '',
    selected: '0',
    isSubmited: false,
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  addTodo = () => {
    const { title, selected } = this.state;

    if (title === '' || selected === '0') {
      this.setState({ isSubmited: true });

      return;
    }

    this.setState(prev => ({
      movies: [...prev.movies,
        {
          title: prev.title,
          user: usersFromServer[selected - 1],
        },
      ],
      isSubmited: false,
    }));
  }

  formObj = () => ({
    value: this.state.title,
    selected: this.state.selected,
    btnStatus: this.state.isSubmited,
    changeHandler: this.handleChange,
    clickHandler: this.addTodo,
    users: usersFromServer,
  })

  render() {
    return (
      <div className="App">
        <h1 className="App__title"> Add Form</h1>
        <TodoList todos={this.state.movies} />
        <AddForm {...this.formObj()} />
      </div>
    );
  }
}

export default App;
