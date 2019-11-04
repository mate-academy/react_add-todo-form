import React from 'react';
import './App.css';

import users from './api/users';
import TodoList from './components/todolist/TodoList';
import NewTodo from './components/newTodo/NewTodo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      id: 1,
      selectedOption: 'Select a user',
      title: '',
      error: null,
    };
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
      error: null,
    });
  }

  onSelectChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
      error: null,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.title.trim() === '') {
      this.setState({
        error: 'Todo field is empty',
      });

      return;
    }

    if (this.state.selectedOption === 'Select a user') {
      this.setState({
        error: 'Choose a user',
      });

      return;
    }

    const newTodo = {
      id: this.state.id,
      title: this.state.title,
      user: this.state.selectedOption,
    };

    this.setState(prevState => ({
      ...prevState,
      id: prevState.id + 1,
      todoList: [...prevState.todoList, newTodo],
      title: '',
      selectedOption: 'Select a user',
      error: false,
    }));
  }

  render() {
    return (
      <>
        <TodoList todos={this.state.todoList} />
        <NewTodo
          onFormSubmit={this.onFormSubmit}
          onInputChange={this.onInputChange}
          onSelectChange={this.onSelectChange}
          usersList={users}
          selectedUser={this.state.selectedOption}
          title={this.state.title}
        />
        {this.state.error ? (<span className="error-span">
                              {this.state.error}
                             </span>) : null
        }
      </>
    );
  }
}

export default App;
