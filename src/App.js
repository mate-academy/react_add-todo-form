import React, { Component } from 'react';
import './App.css';

import users from './api/users';
import AddTodo from './api/component/addTodo/AddTodo';
import TodoList from './api/component/todoList/TodoList';

class App extends Component {
  selectRef = React.createRef();

  state = {
    title: '',
    executor: '',
    error: null,
    todo: [],
    id: 0,
  };

  selectedHandler = (e) => {
    this.setState({
      executor: e.target.value,
      error: null,
    });
  }

  changeTitle = (e) => {
    this.setState({
      title: e.target.value,
      error: null,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();

    if (this.state.title.trim() === '') {
      this.setState({
        error: 'Заповніть будь-ласка завдання',
      });

      return;
    }

    if (this.state.executor === '') {
      this.setState({
        error: 'Виберіть будь-ласка відповілального',
      });

      return;
    }

    const newItem = {
      id: this.state.id,
      title: this.state.title,
      executor: this.state.executor,
    };

    this.setState(prevState => ({
      ...prevState,
      id: prevState.id + 1,
      todo: [
        ...prevState.todo,
        newItem,
      ],
      title: '',
      executor: '',
    }));
    this.selectRef.current.value = 0;
  }

  render() {
    return (
      <div className="App">
        <AddTodo
          users={users}
          title={this.state.title}
          submitHandler={this.submitHandler}
          changeTitle={this.changeTitle}
          selectedHandler={this.selectedHandler}
          selectRef={this.selectRef}
          id={this.state.id}
        />
        {this.state.error && <span>{this.state.error}</span>}
        <TodoList todo={this.state.todo} />
      </div>
    );
  }
}

export default App;
