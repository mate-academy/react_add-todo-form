import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import users from './api/users';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      selectedOption: 'Select a user',
      id: 0,
      todos: [],
    };
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodoItem = {
      id: this.state.id,
      title: this.state.title,
      newTodo: this.state.selectedOption,
    };

    this.setState(prevState => ({
      ...prevState,
      id: prevState.id + 1,
      todos: [
        ...prevState.todos,
        newTodoItem,
      ],
      title: '',
      selectedOption: 'Select a user',
    }));
  }

  render() {
    return (
      <>
        <NewTodo
          handleSubmit={this.handleSubmit}
          handleTitleChange={this.handleTitleChange}
          handleSelectChange={this.handleSelectChange}
          users={users}
          title={this.state.title}
          selectedOption={this.state.selectedOption}
        />
        <TodoList todos={this.state.todos} />
      </>
    );
  }
}

export default App;
